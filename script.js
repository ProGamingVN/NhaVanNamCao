// script.js - Cập nhật để giữ vị trí scroll của nav
document.addEventListener('DOMContentLoaded', () => {
    const navUl = document.querySelector('nav ul');
    
    // Khôi phục vị trí scroll từ localStorage
    const savedScroll = localStorage.getItem('navScrollPosition');
    if (savedScroll !== null && navUl) {
        navUl.scrollLeft = parseInt(savedScroll, 10);
    }
    
    // Lưu vị trí scroll khi click link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (navUl) {
                localStorage.setItem('navScrollPosition', navUl.scrollLeft);
            }
        });
    });
    
    console.log('Website loaded');
});
