// debounce.ts

/**
 * debounce 함수는 전달된 콜백 함수를 특정 지연 시간 이후에 실행합니다.
 * 연속적으로 발생하는 이벤트(예: 키 입력)에 대해 일정 시간 지연 후에만
 * 콜백 함수를 실행하여 불필요한 반복 호출을 방지합니다.
 *
 * @param callback 지연 시간 이후에 실행할 함수.
 * @param delay 지연 시간 (밀리초 단위).
 * @returns 지연 처리가 적용된 함수.
 */
export function debounce<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timer: number; // 타이머 ID를 저장하기 위한 변수

    // 지연 처리가 적용된 함수를 반환
    return (...args: Parameters<T>): void => {
        clearTimeout(timer); // 기존 타이머가 있다면 취소
        timer = setTimeout(() => callback(...args), delay); // 지정된 지연 시간 후에 콜백 함수 실행
    };
}
