// // 해당 함수에서 다룰 데이터의 타입을 인터페이스를 이용해 정의한다.
// // 이 함수는 회원가입, 로그인에서 공통적으로 사용되는 것이기에 양측에서 사용하는 모든 데이터를 정의한다.
// // 다만 로그인에서 사용하지 않는 데이터가 존재하므로 일부 데이터에는 선택적 필드를 적용한다.
// interface AuthFormData {
//     username?: string;
//     email: string;
//     password: string;
//     passwordConfirm?: string;
// }

// // 유효성 검사 함수
// // 사용자가 입력한 값data와 회원가입-로그인 중 어디에서 사용되는지 여부를 판별할isSignup을 인자로 받는다.
// // 이 함수의 반환 값은 객체.
// function validateAuthInput(
//     data: AuthFormData,
//     isSignup: boolean = false
// ): Record<string, string> {
//   // 유효성 검사의 결과에 따른 메시지들을 저장할 객체 데이터.
//   // 유틸리티 타입 Record를 사용하여 해당 객체의 key-value의 타입을 지정한다.
//   const validationResults: Record<string, string> = {
//     username: "",
//     email: "",
//     password: "",
//     passwordConfirm: "",
//     general: ""
//   };

//   // 가장 먼저 빈값을 체크한다.
//   // 회원가입 폼일 경우..
//   // 회원가입의 경우 로그인보다 더 많은 값을 받아오므로 조건문을 나누어서 처리한다.
//   if (
//         isSignup &&
//         (!data.username ||
//             !data.email ||
//             !data.password ||
//             !data.passwordConfirm)
//     ) {
//     validationResults.general = "모든 필드를 채워주세요.";
//   }
//   // 로그인 폼일 경우..
//   else if (!data.email || !data.password) {
//     validationResults.general = "모든 필드를 채워주세요.";
//   }
//   // 빈값 체크가 끝나면 다음 검사로 이동한다.
//   else {
//         // 이메일 유효성 검사
//     if (!/\S+@\S+\.\S+/.test(data.email)) {
//       validationResults.email = "유효하지 않은 이메일 주소입니다.";
//     }
//         // 비밀번호 복잡성 검사
//     if (data.password.length < 8 || !/[a-zA-Z]/.test(data.password) || !/\d/.test(data.password)) {
//       validationResults.password = "비밀번호는 최소 8자 이상이며, 문자와 숫자를 포함해야 합니다.";
//     }
//         // 회원가입 시 비밀번호 확인
//     if (isSignup && data.password !== data.passwordConfirm) {
//       validationResults.passwordConfirm = "비밀번호가 일치하지 않습니다.";
//     }
//         // 회원가입 시 사용자 이름 검사
//     if (isSignup) {
//       if (data.username && !(data.username.length >= 3 && data.username.length <= 50)) {
//         validationResults.username = "사용자 이름은 3자 이상 50자 이하로 설정해야 합니다.";
//       }
//       if (data.username && !/^\w+$/.test(data.username)) {
//         validationResults.username = "사용자 이름에는 문자, 숫자, 밑줄(_)만 사용할 수 있습니다.";
//       }
//     }
//         }
//   }

//   // 모든 유효성 검사를 마치면 객체 validationResults에 적절한 상태 메시지들이 삽입되어 있다.
//   // 그런데 모든 값이 유효하거나 일부 값만 유효한 경우 validationResults에는 메시지가 없는, 값이 존재하지 않는 키들이 남아있게 된다.
//   // 이걸 그냥 넘겨주어도 되지만, 불필요하게 자원을 낭비하게 되는 셈이므로 이를 방지하는 로직이 필요하다.

//   // {
//   //   username: "사용자 이름이 너무 짧습니다.",
//   //   email: "",
//   //   password: "비밀번호가 너무 짧습니다.",
//   //   passwordConfirm: ""
//   // }

//   // 이런 결과가 존재한다고 했을 때.
//   // Object.keys(validationResults)의 결과로 아래와 같은 값이 반환된다.

//   // [username, email, password, passwordConfirm]

//   // 그리고 reduce 함수를 통해 이 배열의 모든 값들을 순차적으로 순회한다.
//   // 순회가 이루어질 때마다 함수 내부에 인자로 사용된 콜백함수에 의해 아래와 같은 동작이 이루어진다.
//   // validationResults 객체의 key값중에 배열 내부 요소와 일치하는 것이 존재한다고 하면. (에러 메시지가 존재하여 value가 ""이 아닌 경우)
//   // 새로운 객체 acc에 acc[key]가 key 값으로, validationResults[key]이 value 값으로 들어가게 된다.

//   // 이렇게 모든 순회를 마치면 새로운 객체 acc에는 에러 메시지가 존재하는 validationResults 객체 내부의 값만이 남게 된다.
//   // 최초 validationResults의 형태가 아래와 같이 필터링되는 것.

//   // {
//   //   username: "사용자 이름이 너무 짧습니다.",
//   //   password: "비밀번호가 너무 짧습니다."
//   // }

//   // 불필요한 데이터를 전송하지 않아 자원의 낭비를 막고, 네트워크의 효율성이 높아지게 된다.

//   return Object.keys(validationResults).reduce(
//         (acc: Record<string, string>, key: string) => {
//     if (validationResults[key]) {
//       acc[key] = validationResults[key];
//     }
//     return acc;
//   }, {});
// }

function validateAuthInput() {
    return null;
}

export { validateAuthInput };
