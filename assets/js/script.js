$('.click-menu').on('click', function(){
    $(this).toggleClass('click-menu-act');
    $('.personal-menu').toggleClass('menu-opened')
})


$(document).ready(function () {
    $('select').styler();
});


function checkMobileMenu() {
    if (window.innerWidth <= 1199) {
        $('.personal-menu').addClass('menu-opened');
    }
}

checkMobileMenu();

// при изменении размера окна
$(window).on('resize', checkMobileMenu);






$('.open-menu').on('click', function(e){
    e.stopPropagation();
    $('body').addClass('body-fixed');
    $('.personal-menu').addClass('menu-open-act');
})
$(window).on('click', function (e) {
    let menuSort = $('.personal-menu');
    if (e.target !== menuSort) {
        menuSort.removeClass('menu-open-act');
    }
    let bodyRemove = $('body');
    if (e.target !== bodyRemove) {
        bodyRemove.removeClass('body-fixed');
    }
});

$('.close-mob-menu').on('click', function(){
    $('body').removeClass('body-fixed');
    $('.personal-menu').removeClass('menu-open-act');
})



$('.personal-menu').on('click', function(e){
    e.stopPropagation();
})











const themeToggle = document.getElementById('theme-toggle');
const lightBtn = document.querySelector('.click-light');
const darkBtn = document.querySelector('.click-dark');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
        darkBtn.classList.add('dark-active');
        lightBtn.classList.remove('light-active');
        localStorage.setItem('theme', 'dark');
    } else {
        lightBtn.classList.add('light-active');
        darkBtn.classList.remove('dark-active');
        localStorage.setItem('theme', 'light');
    }
});

// При загрузке — восстанавливаем тему
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    darkBtn.classList.add('dark-active');
} else {
    lightBtn.classList.add('light-active');
}








$('.card-account-open').on('click', function(e){
    e.stopPropagation();
    $('.card-account-mod').toggleClass('card-account-active')
});

$(window).on('click', function (e) {
    let accountSort = $('.card-account-mod');
    if (e.target !== accountSort) {
        accountSort.removeClass('card-account-active');
    }

});

$(document).ready(function () {
    $('.all-contracts-click').on('click', function (e) {
        e.stopPropagation(); // чтобы клик не улетал на document

        let parent = $(this).parent();

        if (parent.hasClass('all-contracts-opened')) {
            parent.removeClass('all-contracts-opened');
        } else {
            $('.all-contracts-opened').removeClass('all-contracts-opened');
            parent.addClass('all-contracts-opened');
        }
    });

    // Клик вне блоков закрывает всё
    $(document).on('click', function () {
        $('.all-contracts-opened').removeClass('all-contracts-opened');
    });

    // Чтобы клик внутри открытого блока не закрывал его
    $(document).on('click', '.all-contracts-opened', function (e) {
        e.stopPropagation();
    });

    // Клик по кнопке в меню
    $(document).on('click', '.all-contracts-menu li', function (e) {
        e.stopPropagation(); // чтобы не закрылось раньше времени

        let text = $(this).text().trim(); // берём текст кнопки
        let parent = $(this).closest('.all-contracts'); // ищем родительский блок
        parent.find('.all-contracts-click').text(text); // вставляем текст в кнопку

        parent.removeClass('all-contracts-opened'); // закрываем меню после выбора
    });
});



$('.table-search').on('click', function (e) {
    e.stopPropagation();
});

$('.all-contracts-menu li').on('click', function () {
    $('.all-contracts').removeClass('all-contracts-opened');

});













document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("openCalendar");
    const popup = document.getElementById("calendarPopup");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const selectedText = document.getElementById("selectedDateText");

    let viewYear = new Date().getFullYear();
    let viewMonth = new Date().getMonth();
    let selectingStart = true;

    function renderCalendars() {
        let nextMonth = viewMonth + 1;
        let nextYear = viewYear;
        if (nextMonth > 11) {
            nextMonth = 0;
            nextYear++;
        }
        document.getElementById("month1Label").textContent = getMonthName(viewMonth) + " " + viewYear;
        document.getElementById("month2Label").textContent = getMonthName(nextMonth) + " " + nextYear;

        document.getElementById("month1").innerHTML = createCalendar(viewYear, viewMonth);
        document.getElementById("month2").innerHTML = createCalendar(nextYear, nextMonth);
    }

    function createCalendar(year, month) {
        const monthNames = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
        const days = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
        let date = new Date(year, month, 1);
        let table = `<table><tr>${days.map(d => `<th>${d}</th>`).join("")}</tr><tr>`;

        let skip = (date.getDay() + 6) % 7;
        for (let i = 0; i < skip; i++) table += "<td></td>";

        while (date.getMonth() === month) {
            let d = date.getDate();
            table += `<td class="day" data-date="${d}.${month+1}.${year}">${d}</td>`;
            if ((date.getDay() + 6) % 7 === 6) table += "</tr><tr>";
            date.setDate(d + 1);
        }
        table += "</tr></table>";
        return table;
    }

    function getMonthName(month) {
        return ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"][month];
    }

    openBtn.addEventListener("click", () => {
        popup.style.display = popup.style.display === "flex" ? "none" : "flex";
        renderCalendars();
    });

    document.getElementById("cancelBtn").addEventListener("click", () => {
        popup.style.display = "none";
    });

    document.getElementById("applyBtn").addEventListener("click", () => {
        if (startDate.value && endDate.value) {
            selectedText.textContent = `${startDate.value} - ${endDate.value}`;
        }
        popup.style.display = "none";
    });

    document.getElementById("prevMonth").addEventListener("click", () => {
        viewMonth--;
        if (viewMonth < 0) {
            viewMonth = 11;
            viewYear--;
        }
        renderCalendars();
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
        viewMonth++;
        if (viewMonth > 11) {
            viewMonth = 0;
            viewYear++;
        }
        renderCalendars();
    });

    popup.addEventListener("click", function(e) {
        if (e.target.classList.contains("day")) {
            if (selectingStart) {
                startDate.value = e.target.dataset.date;
                endDate.value = "";
                selectingStart = false;
            } else {
                endDate.value = e.target.dataset.date;
                selectingStart = true;
            }
        }
    });
});















$('.open_modal').on('click', function () {
    let attr = $(this).attr('data-val');
    let modal = $('#' + attr);
    modal.removeClass('out');
    modal.fadeIn();
    $('body').addClass('body_fix');
});

$('.close').on('click', function () {

    $('body').removeClass('body_fix');
    let prt = $(this).parents('.modal');

    prt.addClass('out')
    setTimeout(function () {
        prt.fadeOut();
    }, 100);
});



$(window).on('click', function (event) {
    $('.modal').each(function () {

        let gtattr = $(this).attr('id');
        let new_mod = $('#' + gtattr);
        let md_cnt = $(new_mod).find('.modal-content');
        if (event.target === $(md_cnt)[0]) {
            setTimeout(function () {
                $(new_mod).addClass('out');
                $(new_mod).fadeOut()
            }, 100)

        }
        if (event.target === this) {
            setTimeout(function () {
                $(new_mod).addClass('out');
                $(new_mod).fadeOut()
            }, 100)


        }
    })
});



