window.onload = function () {
    const downloadReceiptBtn = document.getElementById("download-receipt");
    const downloadBillBtn = document.getElementById("download-btn");

    if (downloadReceiptBtn) {
        downloadReceiptBtn.addEventListener("click", () => {
            const invoice = document.getElementById("receipt");
            const opt = {
                margin: 1,
                filename: 'receipt.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(invoice).set(opt).save();
        });
    }

    if (downloadBillBtn) {
        downloadBillBtn.addEventListener("click", () => {
            const invoice = document.getElementById("print-content");
            const opt = {
                margin: 1,
                filename: 'bill.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(invoice).set(opt).save();
        });
    }
}
