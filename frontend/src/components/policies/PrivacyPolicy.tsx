import React from 'react';
import styled from 'styled-components';

const PolicyContainer = styled.div`
    background: white;
    color: black;
    padding: 20px;
    margin: 20px;
    border-radius: 5px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h1`
    font-size: 32px;
    text-align: center;
`;

const SectionTitle = styled.h2`
    font-size: 24px;
    margin-top: 20px;
`;

const Paragraph = styled.p`
    font-size: 18px;
    line-height: 1.8;
    margin-bottom: 60px;
`;

const PrivacyPolicy: React.FC = () => {
    return (
        <PolicyContainer>
            <Title>개인정보 처리방침</Title>
            <SectionTitle>1. 개인정보의 처리 목적</SectionTitle>
            <Paragraph>
                [EssenceAura]는 사용자의 이메일 주소를 계정 아이디로 사용합니다.
                본 웹사이트는 비영리적 개인 프로젝트로서 포트폴리오 목적으로만
                사용되며, 사용자의 이름, 전화번호, 주소 등의 추가 정보는
                수집되나 이는 인증 과정 없이 수집되며 실제로 사용되지 않습니다.
            </Paragraph>

            <SectionTitle>2. 개인정보의 처리 및 보유 기간</SectionTitle>
            <Paragraph>
                사용자의 이메일 주소 및 기타 개인정보는 DB에 저장되며,
                프로젝트의 목적이 종료되면 즉시 삭제됩니다. 이 데이터는
                포트폴리오 평가가 끝난 후에는 더 이상 보유하지 않습니다.
            </Paragraph>

            <SectionTitle>3. 개인정보의 제3자 제공에 관한 사항</SectionTitle>
            <Paragraph>
                본 웹사이트는 개인정보를 제3자에게 제공하지 않습니다.
            </Paragraph>

            <SectionTitle>4. 개인정보의 파기절차 및 방법</SectionTitle>
            <Paragraph>
                사용자의 개인정보는 프로젝트 목적이 종료되면 안전하게
                파기됩니다. 파기 방법은 DB에서의 완전 삭제를 통해 이루어집니다.
            </Paragraph>

            <SectionTitle>5. 개인정보의 안전성 확보 조치</SectionTitle>
            <Paragraph>
                [EssenceAura]는 사용자의 개인정보 보호를 위해 적절한 보안 조치를
                취하고 있습니다. 비밀번호를 제외한 개인정보는 암호화되지 않으며,
                AWS RDS를 사용하는 MySQL 데이터베이스에 저장됩니다. 이
                데이터베이스는 안전한 AWS 인프라상에서 관리되며, 관리자 계정은
                프로젝트 관리자에 의해서만 접근이 가능합니다. 본 시스템은 무단
                접근, 파기, 손상, 변경, 유출로부터 개인정보를 보호하기 위해
                최선을 다하고 있습니다.
            </Paragraph>

            <SectionTitle>6. 사용자의 권리와 그 행사방법</SectionTitle>
            <Paragraph>
                사용자는 언제든지 자신의 개인정보 삭제를 요청할 수 있으며, 본
                웹사이트는 요청을 받은 즉시 해당 정보를 삭제합니다.
            </Paragraph>

            <SectionTitle>7. 개인정보 보호책임자</SectionTitle>
            <Paragraph>
                본 웹사이트의 개인정보 보호책임자는 다음과 같습니다:
                <br />
                <br /> <b>이름: 이유승</b>
                <br /> <b>이메일: akows141@gmail.com</b>
            </Paragraph>

            <SectionTitle>8. 변경 사항 통지 의무</SectionTitle>
            <Paragraph>
                본 개인정보 처리방침은 [날짜]에 마지막으로 업데이트되었으며,
                정책의 변경이 있을 경우 웹사이트를 통해 공지할 것입니다.
            </Paragraph>
        </PolicyContainer>
    );
};

export default PrivacyPolicy;
