import React, { useState, useEffect } from "react";
import "./AlgorithmVisualizer.css";

const AlgorithmVisualizer = () => {
    const [array, setArray] = useState([]);
    const [numBars, setNumBars] = useState(50); // Default number of bars is 50

    useEffect(() => {
        generateRandomArray();
    }, [numBars]);

    const generateRandomArray = () => {
        const newArray = [];
        for (let i = 0; i < numBars; i++) {
            newArray.push(Math.floor(Math.random() * 400) + 10);
        }
        setArray(newArray);
    };

    const mergeSort = () => {
        console.log("Merge Sort initiated");
        const animations = [];
        const auxiliaryArray = array.slice();
        mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
        animateSorting(animations);
    };

    const mergeSortHelper = (mainArray, startIdx, endIdx, auxiliaryArray, animations) => {
        if (startIdx === endIdx) return;
        const middleIdx = Math.floor((startIdx + endIdx) / 2);
        mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
        mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
        doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
    };

    const doMerge = (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) => {
        let k = startIdx;
        let i = startIdx;
        let j = middleIdx + 1;
        while (i <= middleIdx && j <= endIdx) {
            animations.push([i, j]);
            animations.push([i, j]);
            if (auxiliaryArray[i] <= auxiliaryArray[j]) {
                animations.push([k, auxiliaryArray[i]]);
                mainArray[k++] = auxiliaryArray[i++];
            } else {
                animations.push([k, auxiliaryArray[j]]);
                mainArray[k++] = auxiliaryArray[j++];
            }
        }
        while (i <= middleIdx) {
            animations.push([i, i]);
            animations.push([i, i]);
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        }
        while (j <= endIdx) {
            animations.push([j, j]);
            animations.push([j, j]);
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    };

    const quickSort = () => {
        console.log("Quick Sort initiated");
        const animations = [];
        const arrayCopy = array.slice(); // Create a copy of the array
        quickSortHelper(arrayCopy, 0, arrayCopy.length - 1, animations);
        animateSorting(animations);
        setArray(arrayCopy); // Update the state after sorting
    };

    const quickSortHelper = (mainArray, startIdx, endIdx, animations) => {
        if (startIdx < endIdx) {
            const pivotIdx = partition(mainArray, startIdx, endIdx, animations);
            quickSortHelper(mainArray, startIdx, pivotIdx - 1, animations);
            quickSortHelper(mainArray, pivotIdx + 1, endIdx, animations);
        }
    };

    const partition = (mainArray, startIdx, endIdx, animations) => {
        const pivotValue = mainArray[endIdx];
        let pivotIdx = startIdx;
        for (let i = startIdx; i < endIdx; i++) {
            animations.push([i, endIdx]);
            animations.push([i, endIdx]);
            if (mainArray[i] < pivotValue) {
                animations.push([i, mainArray[pivotIdx]]);
                animations.push([pivotIdx, mainArray[i]]);
                [mainArray[i], mainArray[pivotIdx]] = [mainArray[pivotIdx], mainArray[i]];
                pivotIdx++;
            } else {
                animations.push([i, mainArray[i]]);
            }
        }
        animations.push([pivotIdx, endIdx]);
        animations.push([pivotIdx, mainArray[endIdx]]);
        animations.push([endIdx, mainArray[pivotIdx]]);
        [mainArray[pivotIdx], mainArray[endIdx]] = [mainArray[endIdx], mainArray[pivotIdx]];
        return pivotIdx;
    };

    const selectionSort = () => {
        console.log("Selection Sort initiated");
        const animations = [];
        const arrayCopy = array.slice();
        for (let i = 0; i < arrayCopy.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < arrayCopy.length; j++) {
                animations.push([j, minIndex]); // Compare bar j with minIndex
                animations.push([j, minIndex]); // Reset colors
                if (arrayCopy[j] < arrayCopy[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                animations.push([i, arrayCopy[minIndex]]); // Swap
                animations.push([minIndex, arrayCopy[i]]);
                [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]];
            }
        }
        animateSorting(animations);
        setArray(arrayCopy);
    };

    const bubbleSort = () => {
        console.log("Bubble Sort initiated");
        const animations = [];
        const arrayCopy = array.slice();
        for (let i = 0; i < arrayCopy.length - 1; i++) {
            for (let j = 0; j < arrayCopy.length - 1 - i; j++) {
                animations.push([j, j + 1]); // Compare bars j and j + 1
                animations.push([j, j + 1]); // Reset colors
                if (arrayCopy[j] > arrayCopy[j + 1]) {
                    animations.push([j, arrayCopy[j + 1]]); // Swap
                    animations.push([j + 1, arrayCopy[j]]);
                    [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
                }
            }
        }
        animateSorting(animations);
        setArray(arrayCopy);
    };

    const insertionSort = () => {
        console.log("Insertion Sort initiated");
        const animations = [];
        const arrayCopy = array.slice();
        for (let i = 1; i < arrayCopy.length; i++) {
            let key = arrayCopy[i];
            let j = i - 1;
            animations.push([i, i]); // Highlight current key
            while (j >= 0 && arrayCopy[j] > key) {
                animations.push([j, j + 1]); // Compare bars
                animations.push([j, j + 1]); // Reset colors
                animations.push([j + 1, arrayCopy[j]]); // Move bar
                arrayCopy[j + 1] = arrayCopy[j];
                j--;
            }
            arrayCopy[j + 1] = key;
        }
        animateSorting(animations);
        setArray(arrayCopy);
    };

    const heapSort = () => {
        console.log("Heap Sort initiated");
        const animations = [];
        const arrayCopy = array.slice();
        let n = arrayCopy.length;

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arrayCopy, n, i, animations);
        }

        // One by one extract elements from heap
        for (let i = n - 1; i > 0; i--) {
            animations.push([0, i]); // Highlight swap
            animations.push([0, i]); // Reset colors
            [arrayCopy[0], arrayCopy[i]] = [arrayCopy[i], arrayCopy[0]];
            heapify(arrayCopy, i, 0, animations);
        }

        animateSorting(animations);
        setArray(arrayCopy);
    };

    const heapify = (arr, n, i, animations) => {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        if (largest !== i) {
            animations.push([i, largest]); // Highlight swap
            animations.push([i, largest]); // Reset colors
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, n, largest, animations);
        }
    };

    const animateSorting = (animations) => {
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("bar");
            const isColorChange = i % 3 !== 2;
            const delay = i * 100; // Delay based on the index

            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];

                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx]?.style;
                    const barTwoStyle = arrayBars[barTwoIdx]?.style; // Optional chaining to prevent errors

                    if (barOneStyle && barTwoStyle) {
                        const color = i % 3 === 0 ? "red" : "blue";
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }
                }, delay);
            } else {
                setTimeout(() => {
                    const [barIdx, newHeight] = animations[i];
                    const barStyle = arrayBars[barIdx]?.style;
                    if (barStyle) {
                        barStyle.height = `${newHeight}px`;
                    }
                }, delay);
            }
        }
    };

    return (
        <div className="visualizer-container">
            <div className="controls">
                <button onClick={generateRandomArray}>Generate New Array</button>
                <button onClick={mergeSort}>Merge Sort</button>
                <button onClick={quickSort}>Quick Sort</button>
                <button onClick={selectionSort}>Selection Sort</button>
                <button onClick={bubbleSort}>Bubble Sort</button>
                <button onClick={insertionSort}>Insertion Sort</button>
                <button onClick={heapSort}>Heap Sort</button>
                <input
                    type="number"
                    className="num-bars-input"
                    value={numBars}
                    onChange={(e) => setNumBars(e.target.value)}
                    min="10"
                    max="200"
                />
            </div>
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="bar"
                        key={idx}
                        style={{
                            height: `${value}px`,
                            width: `${500 / numBars}px`,
                            backgroundColor: "blue",
                            margin: "0 2px",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "12px",
                        }}
                    >
                        {value} {/* Display the value of the bar */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlgorithmVisualizer;
