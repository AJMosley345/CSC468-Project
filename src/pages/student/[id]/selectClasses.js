import { useState, useEffect } from "react";
import { Box, Button, Checkbox, List, ListItem, Typography } from "@mui/material";
import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";

export async function getServerSideProps({ params }) {
    const prisma = new PrismaClient();
    const classes = await prisma.courses.findMany()

    const student = await prisma.students.findUnique({
        where: { student_id: Number(params.id) },
        include: {
          Student_Course: true
        }
    })

    return { 
        props: {
            classes,
            student
        }
    }
}

export default function SelectClasses() {
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [classes, setClasses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    
   useEffect(() => {
        const fetchAllCourses = async () => {
            const res = await fetch("/api/courses/getcourses");
            const data = await res.json();
            setClasses(data);
        }
        fetchAllCourses();
   }, []);

   async function handleClassSelection(e) {
    const classId = Number(e.target.value);
  
    if (e.target.checked) {
      if (selectedClasses.length >= 5){
        setErrorMessage('You can only select up to 5 classes');
        e.target.checked = false;
        return;
      }
  
      const updatedClasses = [...selectedClasses, { id: classId }];
      setSelectedClasses(updatedClasses);
  
      try {
        const res = await fetch('/api/class-selection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId: studentId,
            classId: classId,
            checked: true
          }),
        });
        if (!res.ok) {
          const { message } = await res.json();
          setErrorMessage(message);
          e.target.checked = false;
          setSelectedClasses(selectedClasses.filter((cls) => cls.id !== classId));
        }
      } catch (err) {
        console.error(err);
        setErrorMessage(err);
      }
    } else {
      const updatedClasses = selectedClasses.filter(
        (cls) => cls.course_id !== classId
      );
      setSelectedClasses(updatedClasses);
  
      try {
        const res = await fetch('/api/class-selection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId: studentId,
            classId: classId,
            checked: false
          }),
        });
        if (!res.ok) {
          const { message } = await res.json();
          setErrorMessage(message);
          e.target.checked = true;
          setSelectedClasses([...selectedClasses, { id: classId }]);
        }
      } catch (err) {
        console.error(err);
        setErrorMessage(err);
      }
    }
  }
  

  async function handleSaveClasses() {
    try {
        const res = await fetch('/api/save-classes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId: studentId,
            classIds: selectedClasses.map((cls) => cls.id)
          }),
        });
        if (!res.ok) {
          const { message } = await res.json();
          setErrorMessage(message);
        } else {
          router.push(`/student/${studentId}`);
        }
      } catch (err) {
        console.error(err);
        setErrorMessage('Error saving classes');
      }
  }

    return(
        <>
            <Navbar/>
            <Typography>Select Your Classes</Typography>
            {classes.map(cls => (
                <Box sx={{ border: 1 }}>
                    <List>
                        <Checkbox
                            value={cls.course_id}
                            checked={selectedClasses.some(scls => scls.id === cls.course_id)}
                            onChange={handleClassSelection}
                            sx={{ backgroundColor: "white" }}
                        />
                        
                        <ListItem>{cls.course_number}: {cls.course_name}</ListItem>
                    </List>
                </Box>
            ))}
            <Button onClick={handleSaveClasses}>Save Classes</Button>
        </>
    )
}