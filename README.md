# MyDuit - Sistem Manajemen Keuangan Pribadi

## Demo
- Login: admin / 123
- Live Demo: https://ger123348.github.io/Web-Keuangan_AgileSoftwareTesting/

## Tim Pengembang
| Nama | NPM |
|------|-----|
| Alyaa Zahra Taufik | [2315061076] |
| Arlen Destico | [2315061120] |
| Dara Ayu Rahmadilla | [2315061092] |
| Gerhana Malik Ibrahim | [2315061032] |
| Nabila Putri Ayu Ningtyas | [2315061016] |

## Fitur
- Login dan Logout dengan localStorage
- CRUD Transaksi Lengkap (Tambah, Edit, Hapus)
- Filter dan pencarian real-time
- Dashboard Summary (Pemasukan, Pengeluaran, Saldo)
- Chart Pie dan Line Chart
- Export data ke CSV
- Dark/Light Mode
- Responsive Design
- Pastel Glassmorphism UI

## Tech Stack
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Charts: Chart.js
- Storage: localStorage
- Icons: Font Awesome 6
- Fonts: Google Poppins

## Screenshot



## Cara Install
```
1. Clone repo: git clone https://github.com/[username]/myduit.git
2. cd myduit
3. Buka index.html di browser
4. Login: admin / 123
```

## Struktur Project
```
myduit/
├── index.html
├── dashboard.html
├── css/style.css
├── js/auth.js
├── js/transactions.js
├── screenshots/
├── README.md
└── .gitlab-ci.yml
```

## Git Flow
```
main     → Production
develop  → Development
feature/* → Fitur baru
```

## GitLab CI/CD Pipeline
```
stages:
  - format
pint:
  stage: format
  script:
    - vendor/bin/pint --fix
```

## Contoh Penggunaan
```
Tambah: Rp 500000, Pemasukan, "Gaji"
Filter: "Gaji" atau tanggal tertentu
Export: MyDuit_YYYY-MM-DD.csv
```

## Customization
Edit `js/auth.js` untuk ubah login credentials:
```javascript
if (username === 'admin' && password === '123') {
```

## Contributing
1. Fork repository
2. `git checkout -b feature/nama-fitur`
3. `git commit -m "Add nama-fitur"`
4. Push dan buat Pull Request

## License
MIT License

***

Made for UTS - Tim MyDuit
