document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('recordsContainer');
  var clearBtn = document.getElementById('clearAllBtn');
  if (!container) return;

  function getRecords() {
    var data = localStorage.getItem('contactRecords');
    return data ? JSON.parse(data) : [];
  }

  function renderRecords() {
    var records = getRecords();

    if (records.length === 0) {
      container.innerHTML = '<div class="card" style="text-align:center;padding:3rem;"><h2 style="color:var(--text-secondary);margin-bottom:0.5rem;">No Records Found</h2><p style="color:var(--text-secondary);">No form submissions yet. Go to the <a href="contact.html" style="color:var(--accent);">Contact page</a> to submit a form.</p></div>';
      return;
    }

    var html = '<div class="table-wrapper" style="overflow-x:auto;">';
    html += '<table class="records-table">';
    html += '<thead><tr>';
    html += '<th>#</th><th>Full Name</th><th>Email</th><th>Date of Birth</th><th>Gender</th><th>Photo</th><th>Submitted At</th>';
    html += '</tr></thead><tbody>';

    for (var i = records.length - 1; i >= 0; i--) {
      var r = records[i];
      var num = records.length - i;
      html += '<tr>';
      html += '<td>' + num + '</td>';
      html += '<td>' + escapeHtml(r.fullName) + '</td>';
      html += '<td>' + escapeHtml(r.email) + '</td>';
      html += '<td>' + escapeHtml(r.dob) + '</td>';
      html += '<td>' + escapeHtml(r.gender) + '</td>';
      html += '<td>' + escapeHtml(r.photoName) + '</td>';
      html += '<td>' + escapeHtml(r.submittedAt) + '</td>';
      html += '</tr>';
    }

    html += '</tbody></table></div>';
    html += '<p style="text-align:center;color:var(--text-secondary);margin-top:1rem;">Total: ' + records.length + ' submission(s)</p>';

    container.innerHTML = html;
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (confirm('Are you sure you want to clear all records?')) {
        localStorage.removeItem('contactRecords');
        renderRecords();
      }
    });
  }

  renderRecords();
});
