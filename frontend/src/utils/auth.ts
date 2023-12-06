
// 유효성 검사 함수
// 사용자가 입력한 값data와 회원가입-로그인 중 어디에서 사용되는지 여부를 판별할isSignup을 인자로 받는다.
// 이 함수의 반환 값은 객체.
function validateAuthInput(data: any, isSignup: boolean = false): Record<string, string> {

    // 유효성 검사의 결과에 따른 메시지들을 저장할 객체 데이터.
    // 유틸리티 타입 Record를 사용하여 해당 객체의 key-value의 타입을 지정한다.
    const validationResults: Record<string, string> = {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      general: ""
    };
  
    // 가장 먼저 빈값을 체크한다.
    // 회원가입 폼일 경우..
    // 회원가입의 경우 로그인보다 더 많은 값을 받아오므로 조건문을 나누어서 처리한다.
    if (isSignup && (!data.username || !data.email || !data.password || !data.passwordConfirm)) {
      validationResults.general = "모든 필드를 채워주세요.";
    } 
    // 로그인 폼일 경우..
    else if (!data.email || !data.password) {
      validationResults.general = "모든 필드를 채워주세요.";
    } 
    // 빈값 체크가 끝나면 다음 검사로 이동한다.
    else {

      // 이메일 유효성 검사
      if (!/\S+@\S+\.\S+/.test(data.email)) {
        validationResults.email = "유효하지 않은 이메일 주소입니다.";
      }
  
      // 비밀번호 복잡성 검사
      if (data.password.length < 8 || !/[a-zA-Z]/.test(data.password) || !/\d/.test(data.password)) {
        validationResults.password = "비밀번호는 최소 8자 이상이며, 문자와 숫자를 포함해야 합니다.";
      }
  
      // 회원가입 시 비밀번호 확인
      if (isSignup && data.password !== data.passwordConfirm) {
        validationResults.passwordConfirm = "비밀번호가 일치하지 않습니다.";
      }
  
      // 회원가입 시 사용자 이름 검사
      if (isSignup) {
        if (!(data.username.length >= 3 && data.username.length <= 50)) {
          validationResults.username = "사용자 이름은 3자 이상 50자 이하로 설정해야 합니다.";
        }
        if (!/^\w+$/.test(data.username)) {
          validationResults.username = "사용자 이름에는 문자, 숫자, 밑줄(_)만 사용할 수 있습니다.";
        }
      }
      
    }
  
    // 결과 메시지들을 적절한 형태로 가공하여 반환한다.
    // 가장 처음 Object.keys()를 이용하여 
    return Object.keys(validationResults).reduce((acc: Record<string, string>, key: string) => {
      if (validationResults[key]) {
        acc[key] = validationResults[key];
      }
      return acc;
    }, {});
  }
  

export default { validateAuthInput };