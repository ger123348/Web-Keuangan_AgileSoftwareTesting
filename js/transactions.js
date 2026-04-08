let transactions = JSON.parse(localStorage.getItem('financeData')) || [];
let editingId = null;
let pieChart, lineChart;
const submitBtn = document.getElementById('submitBtn');

document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    updateSummary();
    renderTable();
    
    // Event Listeners
    document.getElementById('search').addEventListener('input', filterTransactions);
    document.getElementById('filterDate').addEventListener('change', filterTransactions);
    document.getElementById('filterType').addEventListener('change', filterTransactions);
    
    if (localStorage.getItem('darkMode') === 'true') toggleDarkMode();
});

function initCharts() {
    const pieCtx = document.getElementById('pieChart')?.getContext('2d');
    pieChart = new Chart(pieCtx, {
        type: 'doughnut',
        data: { 
            labels: ['Pemasukan', 'Pengeluaran'], 
            datasets: [{ data: [0, 0], backgroundColor: ['#4CAF50', '#f44336'], borderWidth: 0, cutout: '60%' }] 
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });

    const lineCtx = document.getElementById('lineChart')?.getContext('2d');
    lineChart = new Chart(lineCtx, {
        type: 'line',
        data: { labels: [], datasets: [{ label: 'Saldo', data: [], borderColor: '#2196F3', fill: true, tension: 0.4 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
    });
}

function updateSummary() {
    const income = transactions.reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum, 0);
    const expense = transactions.reduce((sum, t) => t.type === 'expense' ? sum + t.amount : sum, 0);
    const balance = income - expense;
    
    document.getElementById('totalIncome').textContent = 'Rp ' + new Intl.NumberFormat('id-ID').format(income);
    document.getElementById('totalExpense').textContent = 'Rp ' + new Intl.NumberFormat('id-ID').format(expense);
    document.getElementById('balance').textContent = 'Rp ' + new Intl.NumberFormat('id-ID').format(balance);
    document.getElementById('transCount').textContent = transactions.length;

    pieChart.data.datasets[0].data = [income, expense];
    pieChart.update();

    const monthly = {};
    transactions.forEach(t => {
        const month = t.date.split('-')[1] || '01';
        monthly[month] = (monthly[month] || 0) + (t.type === 'income' ? t.amount : -t.amount);
    });
    lineChart.data.labels = Object.keys(monthly).map(m => `Bln ${m}`);
    lineChart.data.datasets[0].data = Object.values(monthly);
    lineChart.update();

    localStorage.setItem('financeData', JSON.stringify(transactions));
}

function renderTable(filtered = transactions) {
    const tbody = document.querySelector('#transTable tbody');
    tbody.innerHTML = filtered.map((t, id) => `
        <tr class="${t.type}-row">
            <td>${t.date}</td>
            <td>${t.desc}</td>
            <td>Rp ${new Intl.NumberFormat('id-ID').format(t.amount)}</td>
            <td><span class="${t.type}-tag">${t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</span></td>
            <td>
                <button class="edit-btn" onclick="editTransaction(${id})"><i class="fas fa-edit"></i></button>
                <button class="del-btn" onclick="deleteTransaction(${id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function addTransaction() {
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const date = document.getElementById('date').value || new Date().toISOString().split('T')[0];
    const desc = document.getElementById('desc').value.trim();

    if (amount > 0 && desc) {
        const transaction = { amount, type, date, desc };
        
        if (editingId !== null) {
            transactions[editingId] = transaction;
            editingId = null;
            submitBtn.innerHTML = '<i class="fas fa-save"></i> Tambah';
            submitBtn.title = 'Tambah Transaksi Baru';
        } else {
            transactions.push(transaction);
        }
        
        clearForm();
        updateSummary();
        filterTransactions();
    } else {
        alert('❌ Lengkapi Jumlah & Deskripsi!');
    }
}

function editTransaction(id) {
    const t = transactions[id];
    document.getElementById('amount').value = t.amount;
    document.getElementById('type').value = t.type;
    document.getElementById('date').value = t.date;
    document.getElementById('desc').value = t.desc;
    editingId = id;
    submitBtn.innerHTML = '<i class="fas fa-sync"></i> Update';
    submitBtn.title = 'Update Transaksi';
    document.getElementById('desc').focus();
}

function deleteTransaction(id) {
    if (confirm('🗑️ Yakin hapus transaksi ini?')) {
        transactions.splice(id, 1);
        updateSummary();
        filterTransactions();
    }
}

function clearForm() {
    document.getElementById('amount').value = '';
    document.getElementById('type').value = 'income';
    document.getElementById('date').value = '';
    document.getElementById('desc').value = '';
}

function filterTransactions() {
    const search = document.getElementById('search').value.toLowerCase();
    const filterDate = document.getElementById('filterDate').value;
    const filterType = document.getElementById('filterType').value;
    
    const filtered = transactions.filter(t => 
        t.desc.toLowerCase().includes(search) &&
        (!filterDate || t.date === filterDate) &&
        (!filterType || t.type === filterType)
    );
    renderTable(filtered);
}

function exportCSV() {
    const csv = ['Tanggal,Deskripsi,Jumlah,Jenis\n'] + 
        transactions.map(t => `"${t.date}","${t.desc}","Rp ${new Intl.NumberFormat('id-ID').format(t.amount)}",${t.type}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MyDuit_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    const btn = document.getElementById('darkToggle');
    btn.innerHTML = isDark ? '<i class="fas fa-sun"></i> Light Mode' : '<i class="fas fa-moon"></i> Dark Mode';
}