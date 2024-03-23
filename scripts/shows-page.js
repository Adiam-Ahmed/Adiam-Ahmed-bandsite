const showListContainer = document.querySelector('.shows-list__container');
const events = [
    {
        date: "Mon Sept 09 2024",
        venue: "Ronald Lane",
        location: "San Francisco, CA"
    },
    {
        date: "Tue Sept 17 2024",
        venue: "Pier 3 East",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Oct 12 2024",
        venue: "View Lounge",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Nov 16 2024",
        venue: "Hyatt Agency",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Nov 29 2024",
        venue: "Moscow Center",
        location: "San Francisco, CA"
    },
    {
        date: "Wed Dec 18 2024",
        venue: "Press Club",
        location: "San Francisco, CA"
    }
];
function createTabletList(innerText, className) {
    const listItem = document.createElement('li');
    listItem.classList.add(className);
    listItem.innerText = innerText;
    return listItem;
}

function createTabletDiv() {
    const showsTablet = document.createElement('ul');
    showsTablet.classList.add('shows-tablet');
    showListContainer.appendChild(showsTablet);

    const items = [
        { text: 'Date', className: 'shows-tablet__item' },
        { text: 'Venue', className: 'shows-tablet__item' },
        { text: 'Location', className: 'shows-tablet__item' },
        // { text: '', className: 'shows-tablet__item' }
    ];

    items.forEach(item => {
        const listItem = createTabletList(item.text, item.className);
        showsTablet.appendChild(listItem);
    });
}

function renderShow() {
    events.forEach(event => {
        const showDiv = document.createElement('div');
        showDiv.classList.add('show');
        showListContainer.appendChild(showDiv);

        const showInfo = document.createElement('ul');
        showInfo.classList.add('show__info');
        showDiv.appendChild(showInfo);

        const showInfoItem = document.createElement('li');
        showInfoItem.classList.add('show__info-item');
        showInfo.appendChild(showInfoItem);
        showInfoItem.innerText = "DATE"

        const showInfoDay = document.createElement('li');
        showInfoDay.classList.add('show__info-day','show__info--tablet');
        showInfo.appendChild(showInfoDay);
        showInfoDay.innerText = event.date;

        const showInfoVenue = document.createElement('li');
        showInfoVenue.classList.add('show__info-item');
        showInfo.appendChild(showInfoVenue);
        showInfoVenue.innerText = "VENUE"


        const showInfoLocation = document.createElement('li');
        showInfoLocation.classList.add('show__info-location','show__info--tablet');
        showInfo.appendChild(showInfoLocation);
        showInfoLocation.innerText = event.venue;

        const showLocation = document.createElement('li');
        showLocation.classList.add('show__info-item');
        showInfo.appendChild(showLocation);
        showLocation.innerText = "LOCATION"

        const showInfoCity = document.createElement('li');
        showInfoCity.classList.add('show__info-location', 'show__info--tablet');
        showInfo.appendChild(showInfoCity);
        showInfoCity.innerText = event.location;

        const showButtonGetTicket = document.createElement('button');
        showButtonGetTicket.classList.add('show__button-get-ticket');
        showInfo.appendChild(showButtonGetTicket);
        showButtonGetTicket.innerText = 'Buy Tickets';

        const showDivs = showListContainer.querySelectorAll('.show')


        function handleClick(clickedShowDiv) {
            showDivs.forEach(item => {
                item.classList.remove("show--selected");
            })
            clickedShowDiv.classList.add("show--selected")
        }

        showDivs.forEach(item => {
            item.addEventListener("click", function () {
                handleClick(item);

            })

        });

    });
}

createTabletDiv()
renderShow()
