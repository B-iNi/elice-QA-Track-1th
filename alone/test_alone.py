import unittest


#def add(a,b):
 #   return a + b

#class TestSample(unittest.TestCase):
#    def test_add(self):
#        self.assertEqual(add(2,3),5)

#if __name__ == '__main__':
#    unittest.main()

class TestMathOperations(unittest.TestCase):
    def setUp(self):

        self.a = 2
        self.b = 3

    def test_add(self):
        self.assertEqual(self.a + self.b, 5)

    def tearDown(self):

        pass