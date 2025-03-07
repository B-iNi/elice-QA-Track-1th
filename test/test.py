
import unittest                                 #불러움

def add(a, b):
    return a + b

# 테스트 케이스임
class TestSample(unittest.TestCase):            # 불러온걸 상속 시켜줘야함

    def __init__(self,first_num, second_num):
        self.first = first_num                  # 생성자를 통해 변수를 초기화 시켜줌  = 2
        self.second = second_num                # 생성자를 통해 변수를 초기화 시켜줌  = 3
    
    def test_add(self):                         # 유닛테스트에 상속된 함수를 쓰기 위함
        result = add(2, 3)
        must_result = 5

        print(result)
        print(must_result)                      # 로그찍는 부분

        self.assertEqal(result,must_result)     # 결과값이 예상값과 같은지 테스트 하는 것임    

if __name__ == '__main__':                      # 이 파일이 실행 될때 메인이 메인이냐를 묻는것임. 유닛테스트 메일을 실행시키게끔 하는것 (명령어를 통할때는 이렇게)    
    unittest.main()                             # 이걸 써야 실행됨    


test_class = TestSample(2, 3)                   # 클래스를 인스턴스화 시킴 (클래스의 정통적인 사용 방법이라함)


        