const dataContainer = document.getElementById('data');

async function getApiUrl() {
  const response = await fetch('.env');
  const text = await response.text();
  return text.split('=')[1].trim();
}

async function fetchTable(tableName) {
  const apiUrl = await getApiUrl();

  const response = await fetch(apiUrl + tableName, {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  let result = '<table>';

  if (data.length > 0) {
    let columns = [];
    for (let key in data[0]) {
      columns.push(key);
    }

    result = result + '<tr>';
    for (let i = 0; i < columns.length; i = i + 1) {
      result = result + '<th>' + columns[i] + '</th>';
    }
    result = result + '</tr>';
    for (let i = 0; i < data.length; i = i + 1) {
      result = result + '<tr>';
      for (let j = 0; j < columns.length; j = j + 1) {
        let value = data[i][columns[j]];

        if (value == null) {
          value = '';
        }

        result = result + '<td>' + value + '</td>';
      }
      result = result + '</tr>';
    }
  }
  result = result + '</table>';
  dataContainer.innerHTML = result;
}
