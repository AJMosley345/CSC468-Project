import requests
from bs4 import BeautifulSoup
response = requests.get("https://www.wcupa.edu/sciences-mathematics/computerScience/undergradCourses.aspx")

soup = BeautifulSoup(response.content, 'html.parser')
text_table=soup.select_one("table:nth-of-type(n)").get_text()
table = soup.find('table', class_='responsiveTable').get_text()
print(text_table)