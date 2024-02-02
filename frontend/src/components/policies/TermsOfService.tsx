import React from 'react';
import styled from 'styled-components';

const TermsContainer = styled.div`
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

const TermsOfService: React.FC = () => {
    return (
        <TermsContainer>
            <Title>이용 약관</Title>

            <SectionTitle>1. 도입</SectionTitle>
            <Paragraph>
                본 이용 약관(이하 &#39;약관&#39;)은 EssenceAura (이하 &#39;본
                웹사이트&#39;)의 이용 조건을 규정합니다. 본 웹사이트는
                프론트엔드 개발자 포트폴리오 목적으로 제작된 개인 프로젝트이며,
                상업적 목적이나 실제 상업 서비스를 제공하지 않습니다. 본
                웹사이트를 이용함으로써, 사용자는 본 약관의 조건에 동의하게
                됩니다.
            </Paragraph>

            <SectionTitle>2. 포트폴리오 프로젝트로서의 목적</SectionTitle>
            <Paragraph>
                본 웹사이트는 개인 포트폴리오를 위한 비상업적/비영리
                프로젝트로서만 운영되며, 실제 상업적 이용을 위한 서비스 제공을
                목적으로 하지 않습니다. 여기에 게시된 모든 콘텐츠와 기능은
                프론트엔드 개발 능력을 보여주기 위한 예시로 사용되고 있습니다.
            </Paragraph>

            <SectionTitle>3. 저작권 및 사용 권한</SectionTitle>
            <Paragraph>
                본 웹사이트에서 제공하는 모든 콘텐츠는 저작권법에 의해 보호되며,
                비상업적 용도로만 제공됩니다. 사용자는 교육적 목적 또는
                포트폴리오 관련 평가를 위하여 본 웹사이트의 콘텐츠를 조회하거나
                사용할 수 있습니다.
            </Paragraph>

            <SectionTitle>4. 책임의 한계</SectionTitle>
            <Paragraph>
                본 웹사이트는 프론트엔드 개발 능력을 시연하기 위한 목적으로만
                제공되며, 제공되는 정보의 정확성이나 완전성에 대해 어떠한 보증도
                하지 않습니다. 사용자가 본 웹사이트의 콘텐츠를 사용함으로써
                발생할 수 있는 모든 위험은 사용자 본인에게 있으며, 본 웹사이트는
                이로 인해 발생하는 어떠한 손해에 대해서도 책임을 지지 않습니다.
            </Paragraph>

            <SectionTitle>5. 변경 사항</SectionTitle>
            <Paragraph>
                본 웹사이트는 언제든지 본 약관을 수정하거나 업데이트할 권리를
                보유하고 있습니다. 약관이 변경될 경우, 본 웹사이트는 사용자에게
                적절한 방법으로 변경 사항을 통지할 의무가 있습니다.
            </Paragraph>

            <SectionTitle>6. 연락처</SectionTitle>
            <Paragraph>
                본 웹사이트에 관한 질문이나 우려 사항이 있는 경우, [연락처
                정보]를 통해 문의해 주시기 바랍니다.
            </Paragraph>

            <SectionTitle>7. 약관의 효력</SectionTitle>
            <Paragraph>본 약관의 효력은 [작성 날짜]부터 발효됩니다.</Paragraph>
        </TermsContainer>
    );
};

export default TermsOfService;
