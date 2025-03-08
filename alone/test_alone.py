import unittest
import pytest


#def add(a,b):
 #   return a + b

#class TestSample(unittest.TestCase):
#    def test_add(self):
#        self.assertEqual(add(2,3),5)

#if __name__ == '__main__':
#    unittest.main()

#class TestMathOperations(unittest.TestCase):
 #   def setUp(self):

  #      self.a = 2
   #     self.b = 3

    #def test_add(self):
     #   self.assertEqual(self.a + self.b, 5)

    #def tearDown(self):

     #   pass

#def add_review(food, star, comment):
 #   if not (1 <= star <= 5):
  #      raise ValueError("벌점은 1~5점 사이야 함")
   # if len(comment) <5:
    #    raise ValueError("리뷰는 최소 5자 이상이어야 함")
    #return f"{food}: {'★'*star} - {comment}"
    
#print(add_review("피자", 5, "정말 맛있어요!"))

#def add(d,b):
#    return a+b

#def test_add():
 #   assert add(2,3) == 5
  #  assert add(-1,1) == 0

from coupon import apply_coupon


    
    

def test_apply_valid_coupon():
    assert apply_coupon(10000, 20) == 8000

def test_apply_zero_coupon():
    assert apply_coupon(10000, 0) == 10000

def test_apply_full_coupon():
    assert apply_coupon(10000, 100) == 0

def test_invalid_coupon_rate():
    with pytest.raises(ValueError):
        apply_coupon(10000, 101)
