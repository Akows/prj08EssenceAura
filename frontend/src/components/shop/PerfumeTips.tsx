import React from 'react';
import styled from 'styled-components';

const TipsContainer = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
`;

const TipsTitle = styled.h1`
    color: #333;
    margin-bottom: 20px;
`;

const TipsList = styled.ol`
    padding-left: 20px;
    color: #666;
`;

const TipItem = styled.li`
    margin-bottom: 10px;
    line-height: 1.6;
`;

const PerfumeTips: React.FC = () => {
    return (
        <TipsContainer>
            <TipsTitle>향수 구매 및 사용시 주의점</TipsTitle>
            <TipsList>
                <TipItem>
                    피부 타입에 맞는 향수 선택 - 피부 타입(건성, 지성 등)에 따라
                    향수의 지속 시간과 향이 달라질 수 있습니다. 자신의 피부에
                    맞는 제품을 선택하세요.
                </TipItem>
                <TipItem>
                    향수 시향 - 향수를 구매하기 전에는 반드시 시향을 해보는 것이
                    좋습니다. 피부에 직접 뿌려 자신의 체취와 어우러진 향을
                    확인하세요.
                </TipItem>
                <TipItem>
                    적절한 양 사용 - 향수는 과도하게 사용하면 주변 사람에게
                    불쾌감을 줄 수 있습니다. 적당량을 사용해 은은하게 향을
                    남기는 것이 좋습니다.
                </TipItem>
                <TipItem>
                    올바른 뿌리는 방법 - 향수는 피부에서 약 15-20cm 떨어진
                    거리에서 뿌리는 것이 좋습니다. 향이 고르게 분포되도록
                    합니다.
                </TipItem>
                <TipItem>
                    향수의 적절한 부위 - 손목, 목 뒤, 귀 뒤 등 피부가 얇은
                    부위에 향수를 뿌리면 향이 오래 지속됩니다. 직접 옷에 뿌리는
                    것은 피하세요.
                </TipItem>
                <TipItem>
                    향수 보관 - 향수는 직사광선을 피하고, 서늘하고 건조한 곳에
                    보관해야 향의 변질을 방지할 수 있습니다.
                </TipItem>
                <TipItem>
                    여러 향수 혼합 사용 주의 - 다른 향수를 함께 사용하면 향이
                    섞여 원하지 않는 결과를 초래할 수 있습니다. 한 번에 하나의
                    향수만 사용하는 것이 좋습니다.
                </TipItem>
                <TipItem>
                    알레르기 및 피부 반응 주의 - 피부에 자극이나 알레르기 반응이
                    있는 경우, 사용을 즉시 중단하고 전문가와 상담하세요.
                </TipItem>
                <TipItem>
                    유통기한 확인 - 향수에도 유통기한이 있습니다. 구매 시
                    유통기한을 확인하고, 오래된 향수는 사용을 피하세요.
                </TipItem>
                <TipItem>
                    향수 사용환경 고려 - 회의, 공연 등 조용한 환경이나 밀폐된
                    공간에서는 향수 사용을 자제하거나 최소한으로 줄이는 것이
                    좋습니다.
                </TipItem>
            </TipsList>
        </TipsContainer>
    );
};

export default PerfumeTips;
