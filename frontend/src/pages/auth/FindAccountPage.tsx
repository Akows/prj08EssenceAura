import styled from 'styled-components';

const FindAccountWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 120px;
`;

const FindAccountPageContainer = styled.div`
    width: 80%; // 전체 너비 사용
    height: 100%;
    display: flex;
    justify-content: space-between;
    border: 1px solid #ddd;
    border-radius: 5px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Section = styled.section`
    width: 48%;
    padding: 20px;

    &:first-child {
        border-right: 1px solid #ddd;
    }

    @media (max-width: 768px) {
        width: 100%;
        border-right: none;
        &:first-child {
            border-bottom: 1px solid #ddd;
        }
    }
`;

const Form = styled.form`
    margin-top: 20px;
`;

const Label = styled.label`
    display: block;
    margin-top: 15px;
`;

const Input = styled.input`
    width: calc(100% - 20px); // 오른쪽 끝과 여백을 만들기 위해 너비를 조정
    padding: 8px;
    margin-top: 5px;
    margin-right: 10px; // 오른쪽 여백 추가
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
