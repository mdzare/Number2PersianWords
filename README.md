# Number2PersianWords
A lightweight Javascript function for converting numbers to Farsi letters with decimal, percent, currency and minus. also supporting Persian and Arabic characters (حروف نویسی اعداد)
# Usage
number2PersianWords(123) = یکصد و بیست و سه

number2PersianWords(123.23) = یکصد و بیست و سه ممیز بیست و سه صدم

number2PersianWords(12%) = دوازده درصد

number2PersianWords(12300 , { toman:true } ) = هزار و دویست و سی تومان

number2PersianWords(12300 , { currency:'ریال' } ) = دوازده هزار و سیصد ریال

number2PersianWords('٤٥٦') = چهارصد و پنجاه و شش  (اعداد عربی)

number2PersianWords('۴۵۶') = چهارصد و پنجاه و شش (اعداد فارسی)

