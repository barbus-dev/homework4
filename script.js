// Hàm update() - được gọi khi click vào hình ảnh
function update(previewPic) {
    // Bước 1: Sử dụng console.log để kiểm tra sự kiện được kích hoạt
    console.log("Hàm update() được gọi khi click!");
    console.log("Thông tin hình ảnh:", previewPic);
    console.log("Alt text:", previewPic.alt);
    console.log("Source:", previewPic.src);
    
    // Bước 2: Lấy phần tử preview để thay đổi
    const previewElement = document.getElementById('preview');
    const previewTextElement = document.getElementById('preview-text');
    
    // Bước 3: Thay đổi text content của phần tử preview
    if (previewTextElement) {
        previewTextElement.textContent = previewPic.alt;
        console.log("Đã thay đổi text thành:", previewPic.alt);
    }
    
    // Bước 4: Thay đổi background image của phần tử preview
    if (previewElement) {
        previewElement.style.backgroundImage = `url("${previewPic.src}")`;
        previewElement.style.border = "3px solid #ff6b6b";
        console.log("Đã thay đổi background image thành:", previewPic.src);
    }
    
    // Thêm hiệu ứng mượt mà
    previewElement.style.transition = "all 0.4s ease";
    
    // Thêm hiệu ứng click cho hình ảnh được chọn
    previewPic.style.transform = "scale(0.95)";
    setTimeout(() => {
        previewPic.style.transform = "scale(1)";
    }, 150);
}

// Hàm undo() - khôi phục về trạng thái ban đầu (không cần thiết với click)
function undo() {
    // Bước 1: Sử dụng console.log để kiểm tra sự kiện được kích hoạt
    console.log("Hàm undo() được gọi để khôi phục!");
    
    // Bước 2: Lấy phần tử preview để khôi phục
    const previewElement = document.getElementById('preview');
    const previewTextElement = document.getElementById('preview-text');
    
    // Bước 3: Khôi phục background image về giá trị ban đầu
    if (previewElement) {
        previewElement.style.backgroundImage = 'url("")';
        previewElement.style.border = "3px solid #ff6b6b";
        console.log("Đã khôi phục background image về trạng thái ban đầu");
    }
    
    // Bước 4: Khôi phục text về giá trị ban đầu
    if (previewTextElement) {
        previewTextElement.textContent = "Click vào một hình ảnh bên dưới để hiển thị ở đây.";
        console.log("Đã khôi phục text về trạng thái ban đầu");
    }
}

// Hàm bổ sung để kiểm tra và debug
function debugInfo() {
    console.log("=== THÔNG TIN DEBUG ===");
    console.log("Số lượng hình ảnh trong gallery:", document.querySelectorAll('.gallery-image').length);
    console.log("Phần tử preview:", document.getElementById('preview'));
    console.log("Phần tử preview text:", document.getElementById('preview-text'));
    console.log("========================");
}

// Gọi hàm debug khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    console.log("Trang web đã được tải hoàn tất!");
    debugInfo();
    
    // Thêm sự kiện click cho mỗi hình ảnh để test
    const images = document.querySelectorAll('.gallery-image');
    images.forEach((img, index) => {
        img.addEventListener('click', function() {
            console.log(`Hình ảnh ${index + 1} được click:`, this.alt);
        });
    });
});

// Hàm helper để test các chức năng
function testFunctions() {
    console.log("=== TESTING CLICK FUNCTIONS ===");
    
    // Test hàm update với hình ảnh đầu tiên
    const firstImage = document.querySelector('.gallery-image');
    if (firstImage) {
        console.log("Testing update function with click...");
        update(firstImage);
        
        // Sau 3 giây, test hàm undo
        setTimeout(() => {
            console.log("Testing undo function...");
            undo();
        }, 3000);
    }
}

// Thêm nút reset để test
function addResetButton() {
    const container = document.querySelector('.container');
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Preview';
    resetButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        background: #ff6b6b;
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        transition: all 0.3s ease;
    `;
    
    resetButton.addEventListener('click', undo);
    resetButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.background = '#ff5252';
    });
    resetButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#ff6b6b';
    });
    
    document.body.appendChild(resetButton);
}

// Uncomment dòng dưới để chạy test tự động
// testFunctions();

// Thêm nút reset khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    addResetButton();
});
