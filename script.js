const dataContainer = document.getElementById('data');

// Fallback URL in case .env fails to load
const FALLBACK_URL = 'http://hms-api.us-east-1.elasticbeanstalk.com/';

async function getApiUrl() {
  try {
    const response = await fetch('.env');
    if (!response.ok) return FALLBACK_URL;

    const text = await response.text();
    const parts = text.split('=');
    if (parts.length >= 2) {
      return parts[1].trim();
    }
  } catch (error) {
    console.warn('.env not accessible, using fallback URL');
  }
  return FALLBACK_URL;
}

async function fetchTable(tableName) {
  try {
    const apiUrl = await getApiUrl();

    // Ensure the URL ends with a slash if it doesn't
    let baseUrl = apiUrl;
    if (baseUrl.charAt(baseUrl.length - 1) !== '/') {
      baseUrl = baseUrl + '/';
    }

    const response = await fetch(baseUrl + tableName, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Server returned ' + response.status);
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
      result = result + '</tr></thead><tbody>';

      for (let i = 0; i < data.length; i = i + 1) {
        result = result + '<tr>';
        for (let j = 0; j < columns.length; j = j + 1) {
          let value = data[i][columns[j]];
          if (value == null) value = '';
          result = result + '<td>' + value + '</td>';
        }
        result = result + '</tr>';
      }
      result = result + '</tbody>';
    } else {
      result = result + '<tr><td>No data found</td></tr>';
    }

    result = result + '</table>';
    dataContainer.innerHTML = result;
  } catch (error) {
    console.error('Fetch Error:', error);
    dataContainer.innerHTML =
      '<p style="color: red;">Error: ' +
      error.message +
      '<br>Please check if the API URL is correct and the server is running.</p>';
  }
}
