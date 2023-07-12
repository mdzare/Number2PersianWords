
const number2PersianWords = (number, options = {}) => {
    const perDigits = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
    const arabDigits = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'];
    const engDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    var regFa = new RegExp(perDigits.join("|"), "gi");
    var regAr = new RegExp(arabDigits.join("|"), "gi");
    try {
        number = number.replace(regFa, (matched) => engDigits[perDigits.indexOf(matched)]);
        number = number.replace(regAr, (matched) => engDigits[arabDigits.indexOf(matched)]);
    }
    catch { }

    const bigkan = ["", "هزار", "میلیون", "میلیارد", "تریلیون", "هزار تریلیون"];
    const sadgan = ["", "یكصد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"];
    const dahgan = ["", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"];
    const yekan2 = ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"];
    const yekan = ["", "یك", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
    const decimals = ['', 'دهم', 'صدم', 'هزارم', 'میلیونیم', 'میلیاردیم', 'تریلیونیم', 'هزار تریلیونیم']
    var result = '';

    var isPercent = false;
    try {
        isPercent = number[number.length - 1] == '%' ? true : false;
        if (isPercent) {
            number = number.replace('%', '');
        }
    } catch { }

    if (isNaN(number)) {
        return `${number} مجاز نیست`
    }
    if (!number || number == 0) {
        result = "صفر";
    }
    if (number < 0) {
        result = 'منفی ';
        number *= -1;
    }
    if (options.toman == true) {
        number /= 10;
    }
    var decimalPart;
    var decimalLevel = 0
    if (number.toString().includes('e-')){
        decimalLevel = number.toString().split('e-')[1];
        decimalPart = number * Math.pow(10, decimalLevel);
    }
    else if (Math.floor(number)<number){
        decimalPart = number.toString().split('.')[1] + '';
        decimalLevel = decimalPart.length;
    }
    
        const intPart = Math.floor(number);
        const splited = intPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').split(',');

        for (let index = 0; index < splited.length; index++) {
            var tmp = threeDigit(splited[index]);
            result += index != 0 && tmp != '' ? ' و ' : '';
            result += tmp;
            result += splited.length - index - 1 > 0 ? ' ' : '';
            result += tmp != '' ? bigkan[splited.length - index - 1] : '';
        }
        if (decimalPart > 0) {
            if (decimalLevel > 3 && decimalLevel % 3 != 0) {
                decimalPart *= Math.pow(10, 3 - decimalLevel % 3);
            }
            if (decimalLevel > 3) {
                decimalLevel -= decimalLevel - (Math.floor((decimalLevel - 1) / 3) + 3);
            }
            result += ' ممیز ';
            result += number2PersianWords(decimalPart)
            result += ' ' + decimals[decimalLevel];
        }
        if (isPercent || options.percent) {
            result += " درصد";
        }
        if (options.toman || options.currency) {
            result += " " + (options.currency?.length > 0 ? options.currency : "تومان");
        }

        return result;

        function threeDigit(num) {
            var result = '';
            result += sadgan[Math.floor(num / 100)];
            if (num % 100 < 20) {
                if (num % 20 > 9) {
                    result += (result != '' ? " و " : "") + yekan2[num % 10]
                } else {
                    result += (result != '' && num % 10 > 0 ? " و " : "") + yekan[num % 10]
                }
            } else {
                result += (result != '' && Math.floor(num / 10) % 10 > 0 ? " و " : "") + dahgan[Math.floor(num / 10) % 10];
                result += (result != '' && num % 10 > 0 ? " و " : "") + yekan[num % 10];
            }
            return result;
        }
    }

