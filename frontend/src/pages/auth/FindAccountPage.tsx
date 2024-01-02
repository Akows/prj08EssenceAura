import styled from 'styled-components';

const FindAccountWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 120px;
`;

const FindAccountPageContainer = styled.div`
    width: 80%; // 너비를 %로 설정하여 반응형으로 만듭니다.
    max-width: 1000px; // 최대 너비를 지정하여 너무 커지지 않도록 합니다.
    display: flex;
    flex-direction: column; // 모바일 뷰에서는 기본적으로 세로 배치
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 120px;

    @media (min-width: 768px) {
        // 화면 너비가 768px 이상일 때 가로 배치를 적용
        flex-direction: row;
        align-items: stretch; // 이 속성이 두 섹션을 같은 높이로 만듭니다.
    }
`;

const Section = styled.section`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between; // 내용을 위아래로 분산시켜 모든 공간을 채우게 합니다.

    &:first-child {
        border-bottom: 1px solid #ddd; // 모바일 뷰에서는 섹션 사이에 구분선
    }

    @media (min-width: 768px) {
        width: 48%; // 섹션 너비를 48%로 설정

        &:first-child {
            border-bottom: none;
            border-right: 1px solid #ddd; // 가로 배치에서는 오른쪽에 구분선
        }
    }
`;

const Form = styled.form`
    width: 100%; // 부모 요소의 너비를 차지하도록 설정
    box-sizing: border-box; // padding과 border를 너비 계산에 포함
    margin-top: 20px;
`;

const Label = styled.label`
    display: block;
    margin-top: 15px;
`;

const Input = styled.input`
    width: 100%; // padding과 border를 포함한 전체 너비
    padding: 8px;
    box-sizing: border-box; // padding과 border를 너비 계산에 포함
    margin-top: 5px;
`;

const RadioGroup = styled.div`
    margin: 20px 0;
`;

const RadioButton = styled.input`
    margin-right: 10px;
`;

const Button = styled.button`
    padding: 10px 15px;
    margin-top: 20px;
    width: 100%;
    background-color: #e44d26;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #f55f3b;
    }
`;

const FindAccountPage = () => {
    return (
        <FindAccountWrapper>
            <FindAccountPageContainer>
                <Section>
                    <h2>아이디 찾기</h2>
                    <p>
                        회원가입 시, 입력하신 이름 + 이메일을 통해 찾을 수 있는
                        방법으로 아이디를 확인하실 수 있습니다.
                    </p>
                    <Form>
                        <Label>이름</Label>
                        <Input type="text" placeholder="이름" />
                        <Label>E-MAIL</Label>
                        <Input type="email" placeholder="이메일" />
                        <RadioGroup>
                            <RadioButton
                                type="radio"
                                name="findType"
                                value="email"
                                checked
                            />
                            이메일로 찾기
                            <RadioButton
                                type="radio"
                                name="findType"
                                value="phone"
                            />
                            휴대폰 번호로 찾기
                        </RadioGroup>
                        <Button>아이디 찾기</Button>
                    </Form>
                </Section>
                <Section>
                    <h2>비밀번호 찾기</h2>
                    <p>
                        가입하신 아이디+이메일 또는 휴대폰번호를 입력,
                        본인인증을 통해 이메일 또는 휴대폰번호로 임시 비밀번호를
                        보내드립니다.
                    </p>
                    <Form>
                        <Label>이름</Label>
                        <Input type="text" placeholder="이름" />
                        <Label>E-MAIL</Label>
                        <Input type="email" placeholder="이메일" />
                        <RadioGroup>
                            <RadioButton
                                type="radio"
                                name="findType"
                                value="email"
                                checked
                            />
                            이메일로 찾기
                            <RadioButton
                                type="radio"
                                name="findType"
                                value="phone"
                            />
                            휴대폰 번호로 찾기
                        </RadioGroup>
                        <Button>아이디 찾기</Button>
                    </Form>
                </Section>
            </FindAccountPageContainer>
        </FindAccountWrapper>
    );
};

export default FindAccountPage;
