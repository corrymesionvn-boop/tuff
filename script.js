document.addEventListener('DOMContentLoaded', () => {
    const gameListDiv = document.getElementById('game-list');
    const resultDiv = document.getElementById('result');

    // **Bước 1: Tải dữ liệu Game trực tiếp từ file games.json**
    // Dùng đường dẫn tương đối (./games.json) để hoạt động trên GitHub Pages
    fetch('./games.json')
        .then(response => {
            if (!response.ok) {
                // Xử lý lỗi nếu file không tìm thấy hoặc lỗi mạng
                throw new Error('Không thể tải games.json. Vui lòng kiểm tra đường dẫn.');
            }
            return response.json();
        })
        .then(games => {
            if (games.length === 0) {
                gameListDiv.innerHTML = '<p>Không có trò chơi nào trong danh sách.</p>';
                return;
            }

            // **Bước 2: Hiển thị danh sách game**
            games.forEach(game => {
                const gameElement = document.createElement('div');
                gameElement.className = 'game-item';
                
                const title = document.createElement('h3');
                title.textContent = game.name;
                
                const button = document.createElement('button');
                button.textContent = `Tải ngay ${game.name.split(' - ')[0]}`; // Chỉ hiển thị tên game
                
                // Gắn sự kiện click
                button.onclick = () => {
                    initiateDownload(game.pkg_url, game.name);
                };
                
                gameElement.appendChild(title);
                gameElement.appendChild(button);
                gameListDiv.appendChild(gameElement);
            });
        })
        .catch(error => {
            console.error('Lỗi: ', error);
            resultDiv.innerHTML = `<p style="color: red;">Đã xảy ra lỗi khi tải dữ liệu: ${error.message}</p>`;
        });
});

/**
 * Hàm kích hoạt quá trình tải xuống trên trình duyệt PS4.
 * @param {string} pkgUrl - URL PKG trực tiếp.
 * @param {string} gameName - Tên game.
 */
function initiateDownload(pkgUrl, gameName) {
    const resultDiv = document.getElementById('result');
    
    // Hiển thị thông báo trước khi chuyển hướng
    resultDiv.innerHTML = `Đang kích hoạt tải xuống cho **${gameName}**... <br> (Nếu không tự động, vui lòng chờ).`;
    
    // **Bước 3: Chuyển hướng trình duyệt PS4**
    // Lệnh này sẽ chuyển hướng trình duyệt PS4 đến URL PKG. 
    // Nếu PS4 đã được chuẩn bị (exploit), nó sẽ bắt đầu tải xuống và cài đặt.
    window.location.href = pkgUrl;
    
    // Tùy chọn: Thay vì chuyển hướng, bạn có thể chỉ hiển thị một liên kết:
    /*
    resultDiv.innerHTML = `Vui lòng nhấp vào liên kết sau trên trình duyệt PS4 để bắt đầu tải: <br> <a href="${pkgUrl}" target="_blank">Tải ${gameName}</a>`;
    */
}
