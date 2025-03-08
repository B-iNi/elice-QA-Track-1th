def apply_coupon(price, coupon_rate):
    if not (0 <= coupon_rate <= 100):  # 올바른 조건문 들여쓰기
        raise ValueError('쿠폰 할인율 범위값 에러')
    return price * (1 - coupon_rate / 100)  # 들여쓰기 확인
