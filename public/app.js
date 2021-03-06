/*  global io, feathers, document */

const socket = io();
const client = feathers();
let service = null;

client.configure(feathers.socketio(socket));
client.configure(feathers.authentication());

const appElements = {
  loadingEl: document.querySelector('#loading'),
  anonymousSection: document.querySelector('#anonymous'),
  authorizedSection: document.querySelector('#authorized'),
};

client.authenticate()
  .then(() => {
    initHTML(true);
  })
  .catch((err) => {
    console.log(err); // eslint-disable-line no-console
    initHTML(false);
  });

function initHTML(isLoggedIn) {
  appElements.loadingEl.classList.add('hidden');
  if (isLoggedIn) {
    const currentTab = document.location.hash.slice(1);
    appElements.authorizedSection.classList.remove('hidden');
    if (currentTab) {
      setActiveTab(currentTab);
      renderMainContent(currentTab);
    }
    initTabClickHandler();
    initItemClickHandler();
  } else {
    appElements.anonymousSection.classList.remove('hidden');
  }
}

function initTabClickHandler() {
  const navigation = appElements.authorizedSection.querySelector('.navigation');
  navigation.addEventListener('click', (event) => {
    const listEl = event.target.closest('li');

    if (!listEl || !listEl.dataset) {
      return;
    }

    const tabId = listEl.dataset.tab;

    if (!tabId) {
      return;
    }

    setActiveTab(tabId);
    renderMainContent(tabId);
  });
}

function initItemClickHandler() {
  const mainTabelEL = appElements.authorizedSection.querySelector('.mainTable');
  mainTabelEL.addEventListener('click', (event) => {
    const rowEl = event.target.closest('tr');
    if (rowEl && rowEl.dataset) {
      renderDetails(rowEl.dataset.id);
    }
  });
}

function setActiveTab(tabRef) {
  service = client.service(tabRef);
  const tabEls = appElements.authorizedSection.querySelectorAll('.navigation li');
  tabEls.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.tab === tabRef);
  });
}

async function renderMainContent(tabRef) {
  const items = await service.find(tabRef).then((result) => result.data);
  const mainTabelEL = appElements.authorizedSection.querySelector('.mainTable');

  renderTable(items);
  renderDetails(null);

  service.on('created', (item) => {
    const currentTab = document.location.hash.slice(1);
    // TODO: this is hacky; need to better setup this 'created' handler.
    if (tabRef === currentTab) {
      const rowHTML = renderTableRow(item);
      mainTabelEL.querySelector('tbody').innerHTML += rowHTML;
    }
  });
}

function renderTable(items){
  const mainTabelEL = appElements.authorizedSection.querySelector('.mainTable');

  if (!items || !items.length) {
    mainTabelEL.querySelector('thead').innerHTML = '';
    mainTabelEL.querySelector('tbody').innerHTML = '<tr><td>no data</td></tr>';
    return;
  }

  mainTabelEL.querySelector('thead').innerHTML = renderTableHeaders(items[0]);
  mainTabelEL.querySelector('tbody').innerHTML = renderTableBody(items);
}

function renderTableHeaders(item){
  const tableHeaders = Object.keys(item).map(renderTableHeader);
  return `<tr>${tableHeaders.join('')}</tr>`;
}

function renderTableHeader(col) {
  return `<th>${col}</th>`;
}

function renderTableBody(items) {
  const tableBody = items.reduce((obj, item) => {
    obj.push(`<tr data-id=${item.id || item._id}>${renderTableRow(item)}</tr>`);
    return obj;
  }, []);
  return tableBody.join('');
}

function renderTableRow(row){
  return Object.entries(row).map(renderTableCell)
    .join('');
}

function renderTableCell(cell) {
  return `<td>${cell[1]}</td>`;
}

async function renderDetails(id) {
  const detailsEl = appElements.authorizedSection.querySelector('.details');
  const item = (id) ? await service.get(id) : null;
  const output = (item) ? `<pre>${JSON.stringify(item, null, 2)}<pre>` : '';

  detailsEl.innerHTML = output;
}
