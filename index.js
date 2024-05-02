function generateMatrixInputs() {
    const matrix1Rows = parseInt(document.getElementById('matrix1-rows').value);
    const matrix1Cols = parseInt(document.getElementById('matrix1-cols').value);
    const matrix2Rows = parseInt(document.getElementById('matrix2-rows').value);
    const matrix2Cols = parseInt(document.getElementById('matrix2-cols').value);

    // Clear previous inputs
    const matrixInputs = document.getElementById('matrix-inputs');
    matrixInputs.innerHTML = '';

    // Validate matrix dimensions
    if (matrix1Cols !== matrix2Rows) {
        alert('Matrix multiplication not possible. The number of columns in Matrix 1 must match the number of rows in Matrix 2.');
        return;
    }

    // Generate inputs for Matrix 1
    const matrix1Container = document.createElement('div');
    matrix1Container.innerHTML = '<h3>Matrix 1</h3>';
    for (let i = 0; i < matrix1Rows; i++) {
        const row = document.createElement('div');
        for (let j = 0; j < matrix1Cols; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.name = `matrix1-${i}-${j}`;
            row.appendChild(input);
        }
        matrix1Container.appendChild(row);
    }
    matrixInputs.appendChild(matrix1Container);

    // Generate inputs for Matrix 2
    const matrix2Container = document.createElement('div');
    matrix2Container.innerHTML = '<h3>Matrix 2</h3>';
    for (let i = 0; i < matrix2Rows; i++) {
        const row = document.createElement('div');
        for (let j = 0; j < matrix2Cols; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.name = `matrix2-${i}-${j}`;
            row.appendChild(input);
        }
        matrix2Container.appendChild(row);
    }
    matrixInputs.appendChild(matrix2Container);
}

function calculateResult() {
    const matrix1Rows = parseInt(document.getElementById('matrix1-rows').value);
    const matrix1Cols = parseInt(document.getElementById('matrix1-cols').value);
    const matrix2Rows = parseInt(document.getElementById('matrix2-rows').value);
    const matrix2Cols = parseInt(document.getElementById('matrix2-cols').value);

    // Collect matrix 1 data
    const matrix1 = [];
    for (let i = 0; i < matrix1Rows; i++) {
        const row = [];
        for (let j = 0; j < matrix1Cols; j++) {
            const input = document.querySelector(`input[name="matrix1-${i}-${j}"]`);
            row.push(parseFloat(input.value));
        }
        matrix1.push(row);
    }

    // Collect matrix 2 data
    const matrix2 = [];
    for (let i = 0; i < matrix2Rows; i++) {
        const row = [];
        for (let j = 0; j < matrix2Cols; j++) {
            const input = document.querySelector(`input[name="matrix2-${i}-${j}"]`);
            row.push(parseFloat(input.value));
        }
        matrix2.push(row);
    }

    // Perform matrix multiplication
    const result = multiplyMatrices(matrix1, matrix2);

    // Display result
    displayResult(result);
}

function multiplyMatrices(matrix1, matrix2) {
    const rows1 = matrix1.length;
    const cols1 = matrix1[0].length;
    const rows2 = matrix2.length;
    const cols2 = matrix2[0].length;

    // Initialize the result matrix
    const result = [];
    for (let i = 0; i < rows1; i++) {
        const row = [];
        for (let j = 0; j < cols2; j++) {
            row.push(0);
        }
        result.push(row);
    }

    // Perform matrix multiplication
    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols2; j++) {
            for (let k = 0; k < cols1; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h3>Result</h3>';

    // Display the result matrix
    result.forEach(row => {
        const rowDiv = document.createElement('div');
        row.forEach(value => {
            const span = document.createElement('span');
            span.textContent = `${value.toFixed(2)} `;
            rowDiv.appendChild(span);
        });
        resultDiv.appendChild(rowDiv);
    });
}