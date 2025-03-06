import os
import time
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.common.action_chains import ActionChains
from datetime import datetime

#로그 설정을 위한것임
logging.basicConfig(
    level = logging.INFO,
    format = '%(asctime)s - %(levelname)s - %(message)s',
    filename = 'test.log'
)
logger = logging.getLogger(__name__) #여기까지가

logger.info("Chrome Driver Start")
driver = webdriver.Chrome()  # 크롬으로 열겠다

logger.info("http://localhost:3000/login")
driver.get("http://localhost:3000/login") # 해당 주소를

logger.info(f"Title: {driver.title}")
print(driver.title) # 주소 타이틀을 출력

logger.info(f"URL: {driver.current_url}")
print(driver.current_url) # 주소를 출력

########회원가입 부분임########

#newlogin = driver.find_element(By.XPATH,'//*[@id="root"]/div/div[2]/form/div[4]/a') # 회원가입 버튼을 찾고
time.sleep(1)  # 잠시 대기
#logger.info("회원가입 버튼 클릭")
#newlogin.click() # 클릭

#logger.info("회원가입 아이디 입력")
#userid = driver.find_element(By.ID,"username")
UserID = "100bini"  # <--- 이제 여기 아이디만 바꾸면 가능      
#userid.send_keys(UserID) # 회원가입 아이디

#logger.info("회원가입 비밀번호 입력")
#userpassword = driver.find_element(By.ID,"password")
UserPW = "1234"  # <--- 이제 여기 비번만 바꾸면 가능 
#userpassword.send_keys(UserPW)  # 회원가입 비번


#logger.info("회원가입 이메일 입력")
#usermail = driver.find_element(By.ID,"email")
UserMail = "bini@gmail.com"  # <--- 이제 여기 메일만 바꾸면 가능
#usermail.send_keys(UserMail)    # 회원가입 이메일

#logger.info("회원가입 비밀번호 확인")
#userpassword2 = driver.find_element(By.ID,"passwordConfirm")
#userpassword2.send_keys(UserPW)  # 회원가입 비번확인

#print(driver.current_url) # 회원가입 페이지 url 출력
#button = driver.find_element(By.XPATH,'//*[@id="root"]/div/div[2]/form/div[6]/button').click()  # 회원가입 버튼 클릭
#time.sleep(5)
#logger.info("회원가입 완료")
#alert = driver.switch_to.alert  # 가입 성공 팝업창
#print(alert.text)
#alert.accept()


######### 이제 로그인 할 차례 ###########

time.sleep(1)
#inputID = driver.find_element(By.XPATH,'//*[@id="email"]').send_keys("user123@gmail.com")
inputID = driver.find_element(By.XPATH,'//*[@id="email"]').send_keys(UserMail)  #이거쓰면 일일이 아이디 바꿀 필요 없음 
logger.info(f"로그인 아이디 입력{UserMail}")

#inputPW = driver.find_element(By.XPATH,'//*[@id="password"]').send_keys("1234")
inputPW = driver.find_element(By.XPATH,'//*[@id="password"]').send_keys(UserPW)  #이거쓰면 일일이 비번 바꿀 필요 없음
logger.info(f"로그인 비밀번호 입력{UserPW}")
time.sleep(1)
loginbutton = driver.find_element(By.XPATH,'//*[@id="root"]/div/div[2]/form/div[4]/button').click()
logger.info("로그인 완료")
time.sleep(3)

current_url = driver.current_url
print(current_url)
expected_url = "http://localhost:3000/browse"

assert current_url == expected_url, f"실제 URL: {current_url}, 기대 URL: {expected_url}"
logger.info(f"로그인 성공 후 URL: {current_url}")

try:
    logout_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div[1]/div[2]/button[1]'))
    )
    assert logout_button.is_displayed(), "로그아웃 버튼이 없음"
    logger.info("로그아웃 버튼 확인")
except Exception as e:
    logger.error(f"로그아웃 버튼 확인 실패 : {e}")
    rasie

searchbox = driver.find_element(By.XPATH,'//*[@id="root"]/div/div[2]/div/div[2]/div/div[1]/div[2]/div/input')
Box = "test"   #  <--- searchbox에 입력하는 값임 이제 이것만 바꾸자
searchbox.send_keys(Box)
logger.info(f"검색어 입력:{Box}")

WebDriverWait(driver,10).until(
    EC.presence_of_all_elements_located((By.XPATH,'//*[@id="root"]/div/div[2]/div/div[2]/div/div[1]/div[2]/div/div'))
)
# 검색한 후 뜨는 목록 개수 확인
time.sleep(2)
userlist = driver.find_elements(By.XPATH,'//*[@id="root"]/div/div[2]/div/div[2]/div/div[1]/div[2]/div/div')


name_list = []    
for user in userlist:
    cleaned_text = user.text.strip().replace("\n"," ").replace("\t"," ")
    name_parts = cleaned_text.split()

    for i in range(1,len(name_parts),2):
        name_list.append(name_parts[i])

print(name_list)
logger.info(f"검색된 유저 리스트: {name_list}")
print(f"검색된 유저 수: {len(name_list)}")

# 검색한 유저를 클릭하는 것임
driver.find_element(By.XPATH,'//*[@id="root"]/div/div[2]/div/div[2]/div/div[1]/div[2]/div/div/div[16]/button').click()
logger.info("검색한 유저 클릭")

# 테마 색상 변경 확인 



theme_div = driver.find_element(By.XPATH,'//*[@id="root"]/div/div[1]') #테마 변경 확인을 위한 div임
color_button = driver.find_element(By.XPATH,'//*[@id="root"]/div/div[1]/div[2]/button[2]')
before_color = driver.execute_script("return window.getComputedStyle(arguments[0]).backgroundColor;",theme_div)
print(f"변경 전 색상: {before_color}")
color_button.click()
logger.info("테마 변경 버튼 클릭")
time.sleep(2)
color_button2 = driver.find_element(By.XPATH,'//*[@id="root"]/div/div[1]/div[2]/button[2]')
after_color = driver.execute_script("return window.getComputedStyle(arguments[0], null).getPropertyValue('background-color');", theme_div)
print(f"변경된 색상: {after_color}")
logger.info(f"테마 변경 전 색상: {before_color}")
logger.info(f"테마 변경 후 색상: {after_color}")


time.sleep(2)

###### 일정 생성 자동화 테스트 ######
new_schedule = driver.find_element(By.XPATH,'//*[@id="root"]/div/div[1]/div[1]/a[2]').click()
logger.info("일정 생성 버튼 클릭")
time.sleep(3)
#schedule_url = "http://localhost:3000/create"
#assert current_url == schedule_url, f"실제 URL: {current_url}, 기대 URL: {schedule_url}"
current_url = driver.current_url
print(current_url)
logger.info(f"일정 생성 페이지 이동 {current_url}")


schedule_title = driver.find_element(By.XPATH,'//*[@id="title"]')
schedule_TITLE = "테스트 일정"
schedule_title.send_keys(schedule_TITLE)
logger.info(f"일정 제목 입력{schedule_TITLE}")

time.sleep(1)

schedule_info = driver.find_element(By.XPATH,'//*[@id="description"]')
schedule_INFO = "설얼얼얼ㅇ렁렁러얼명란"
schedule_info.send_keys(schedule_INFO)
logger.info(f"일정 설명 입력{schedule_INFO}")

schedule_area = driver.find_element(By.XPATH,'//*[@id="location"]')
schedule_AREA = "대한민국 어딘가의 방구석"
schedule_area.send_keys(schedule_AREA)
logger.info(f"장소 입력함{schedule_AREA}")

date_input = driver.find_element(By.XPATH,'//*[@id="date"]')
start_time_input = driver.find_element(By.XPATH,'//*[@id="startTime"]')
end_time_input = driver.find_element(By.XPATH,'//*[@id="endTime"]')

today = datetime.today().strftime("%Y-%m-%d")
 # 날짜 입력 (오늘 날짜로 자동 설정)
driver.execute_script("""
    const input = arguments[0];
    input.setAttribute('value', arguments[1]);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
""", date_input, today)

    # 시작 시간 입력
driver.execute_script("""
    const input = arguments[0];
    input.setAttribute('value', '14:00');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
""", start_time_input)


    # 종료 시간 입력
driver.execute_script("""
    const input = arguments[0];
    input.setAttribute('value', '15:00');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
""", end_time_input)
logger.info(f"날짜, 시작시간, 종료시간 입력{today}")

time.sleep(2)

schedule_button = driver.find_element(By.XPATH,'//*[@id="root"]/div/div[2]/form/div[8]/button').click()
logger.info("일정 생성 완료")
time.sleep(3)

current_url = driver.current_url
if current_url != expected_url:
    print("✅ 일정 생성 페이지 이동 테스트 성공")
    logger.info("일정 생성 페이지 이동 테스트 성공")
else:
    print("❌ 일정 생성 페이지 이동 테스트 실패")
    logger.error("일정 생성 페이지 이동 테스트 실패")
time.sleep(2)

# 일정을 수정할거임

edit_button = driver.find_element(By.XPATH,'//*[@id="root"]/div/div[2]/div/div[8]/a').click()
logger.info("일정 수정 버튼 클릭")
time.sleep(2)

schedule_title = driver.find_element(By.XPATH,'//*[@id="title"]')
schedule_title.clear()
time.sleep(1)

Edit_TITLE = "여기까진 마스터 했다!!!!!!! 로그도 뜬다"
schedule_title.send_keys(Edit_TITLE)
schedule_button = driver.find_element(By.XPATH,'//*[@id="root"]/div/div[2]/form/div[8]/button').click()
logger.info(f"일정 수정 완료:{Edit_TITLE}")
time.sleep(2)
















input("Enter를 누르면 창이 닫힙니다...")
driver.quit()