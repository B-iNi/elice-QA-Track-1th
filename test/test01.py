#import unittest

#def add_review(food = "라면", star = 1, comment = None):     # None 기본값을 시정
    
 #   if comment is None:
  #      raise ValueError('코멘트 입력해줘')

   # if not (1 <= star <= 5):
    #    print('숫자에러')
     #   raise ValueError("별점은 1~5사이로 입력")  #리턴이나, raise 명령어 if else 잘 안씀
    
    #if len(comment) < 5:
     #   raise ValueError("리뷰는 최소 5자")
    
    #return f"{food}: {'★'* star} - {comment}"

#class TestReview(unittest.TestCase):

 #   def test_add_review_success(self):
  #      food = '피자'
   #     star = 3
    #    comment = '아 맛있다!!!'

     #   result = add_review(food, star, comment)
      #  must_result = f"{food}: {'★'* star} - {comment}"

       # self.assertEqual(result, must_result)

   # def test_add_review_failed(self):

    #    with self.assertRaises(ValueError):
     #       add_review(star=0, comment="짧음")

      #  with self.assertRaises(ValueError):
       #     add_review()

#if __name__ == '__main__':
 #   unittest.main() ```
####################################################################
import unittest


#데코레이터 -> 함수를 감싸는 함수
#데코 - 장식

#클래스 나 함수에 장식처럼 다는 코드단위를 말함
#--> 기능을 확장시켜 주는 역할을 함 or 기능을 추가 또는 동작을 먼저 처리해 주는 기능이 있음
#데코레이터는 @로 시작함



def add_review(food="라면", star=0, comment='인사'):  
  if food == None or star == None or comment == None:
    return None
  
  if not (1 <= star <= 5):
    raise ValueError("별점은 1~5사이로 입력") #리턴이나 , raise 명령어 if else -> 잘 안쓴다.
  
  if len(comment) < 5:
    raise ValueError("리뷰는 최소 5자")

  
  return f"{food}: {'★' *  star} - {comment}"

class TestReview(unittest.TestCase):
  
  @unittest.skip('이 테스트 케이스는 넘어가라')
  def test_add_reivew_success(self):
    food = '피자'
    star = 3
    comment = '아 맛있다!!!'

    result = add_review(food, star, comment)
    must_result = f"{food}: {'★' *  star} - {comment}"
    
    self.assertEqual(result, must_result)

  def test_add_review_faild(self):
    with self.assertRaises(ValueError):
      add_review()

  def test_add_review_none(self):
     self.assertIsNone(add_review(None, None))

  def test_add_review_not_none(self):
    food = '피자'
    star = 3
    comment = '아 맛있다!!!'

    result = add_review(food, star, comment)
    self.assertIsNotNone(result)

  def test_add_reivew_in_str(self):
    food = '피자'
    star = 3
    comment = '아 맛있다!!!'

    result = add_review(food, star, comment)

    self.assertIn(comment, result)

   def test_add_reivew_except(self):
    food = '피자'
    star = 6
    comment = '아 맛있다!!!'

    result = add_review(food, star, comment)
    must_result = f"{food}: {'★' *  star} - {comment}"

    self.assertEqual
    
if __name__ == '__main__':
  unittest.main()