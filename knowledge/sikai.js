// 添加点击效果
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(e) {
        // 添加点击反馈效果
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});