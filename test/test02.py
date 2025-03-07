import pytest
import logging

def apply_coupon(price, coupon_rate):
  if not (0 <= coupon_rate <= 100):
    raise ValueError('쿠폰 할인율 범위값 에러')
  
  return price * (1 - coupon_rate / 100)

def test_apply_valid_coupon():
  logging.info('성공 테스트 실행행')
  assert apply_coupon(10000, 20) == 8000 #20프로 할인

def test_apply_zero_coupon():
  assert apply_coupon(10000, 0) == 10000 #할인 없음

@pytest.mark.skip(reason="그냥!!!")
def test_invalid_coupon_rate():
  pytest.raises(ValueError, apply_coupon,10000, 101)

def test_invalid_coupon_rate_two():
  with pytest.raises(ValueError, match='쿠폰 할인율 범위값 에러!!'):
    apply_coupon(10000, 101)

@pytest.mark.parametrize("price, discount", [(10000, 10), (10000, 20), (10000, 30)])
def test_apply_valids_coupon(price, discount):
  assert apply_coupon(price, discount) == price * (1 - discount / 100)