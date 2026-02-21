const dataContainer = document.getElementById('data');

async function getApiUrl() {
  try {
    const response = await fetch('.env');
    if (!response.ok) throw new Error();
    const text = await response.text();
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i = i + 1) {
      if (lines[i].indexOf('API_URL=') !== -1) {
        let url = lines[i].split('=')[1].trim();
        // If on HTTPS (Netlify) but URL is HTTP, use the proxy
        if (
          window.location.protocol === 'https:' &&
          url.indexOf('http://') === 0
        ) {
          return '/api/';
        }
        return url;
      }
    }
    throw new Error('API_URL not found');
  } catch (err) {
    // Fallback logic for Netlify vs Local
    if (window.location.protocol === 'https:') {
      return '/api/'; // Uses the proxy defined in _redirects
    }
    return 'http://hms-api.us-east-1.elasticbeanstalk.com/';
  }
}

async function fetchTable(tableName) {
  document.getElementById('tableTitle').innerText =
    tableName.charAt(0).toUpperCase() + tableName.slice(1);

  try {
    const apiUrl = await getApiUrl();
    const fullUrl = apiUrl + tableName;

    const response = await fetch(fullUrl, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Could not fetch data (Status: ' + response.status + ')');
    }

    const data = await response.json();
    let result = '<table>';

    if (data.length > 0) {
      let columns = [];
      for (let key in data[0]) {
        columns.push(key);
      }

      result = result + '<thead><tr>';
      for (let i = 0; i < columns.length; i = i + 1) {
        result = result + '<th>' + columns[i] + '</th>';
      }
      result = result + '</tr></thead>';

      result = result + '<tbody>';
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
      result = result + '</tbody>';
    } else {
      result = result + '<tr><td>No records found.</td></tr>';
    }

    result = result + '</table>';
    dataContainer.innerHTML = result;
  } catch (error) {
    dataContainer.innerHTML =
      '<p style="color: red;">Error: ' + error.message + '</p>';
  }
}
