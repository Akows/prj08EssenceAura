import styled from 'styled-components';
import FindIdForm from '../../components/auth/FindIdForm';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

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

const FindAccountPage = () => {
    return (
        <FindAccountWrapper>
            <FindAccountPageContainer>
                <Section>
                    <FindIdForm />
                </Section>
                <Section>
                    <ResetPasswordForm />
                </Section>
            </FindAccountPageContainer>
        </FindAccountWrapper>
    );
};

export default FindAccountPage;
