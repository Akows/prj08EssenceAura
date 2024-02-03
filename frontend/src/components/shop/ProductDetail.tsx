import React from 'react';

type PerfumeType = '남성향수' | '여성향수' | '남녀공용';

interface ProductDetailProps {
    imageUrl: string;
    productName: string;
    productDescription: string;
    perfumeType: PerfumeType;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
    imageUrl,
    productName,
    productDescription,
    perfumeType,
}) => {
    const getPerfumeAdvice = (type: PerfumeType): string => {
        switch (type) {
            case '남성향수':
                return `
              남성용 향수 특징 및 사용 주의점:
              특징:
              - 남성용 향수는 일반적으로 강렬하고 단단한 향을 지닌다.
              - 우디, 스파이시, 시트러스 계열의 향이 주를 이룬다.
              - 남성스러운 카리스마와 세련된 이미지를 강조한다.
              - 지속 시간이 긴 편이며, 보통 낮보다는 저녁 시간대에 어울린다.
              사용 주의점:
              - 과도한 사용은 주변 사람에게 불쾌감을 줄 수 있으니 적당량을 사용한다.
              - 향이 강할 수 있으므로, 회의나 조용한 사무실 환경에서는 사용을 자제한다.
              - 향수를 뿌릴 때는 피부에서 15-20cm 떨어진 거리에서 뿌려 향이 고르게 퍼지도록 한다.
              - 향수를 바른 부위를 문지르지 않는다. 이는 향의 본질을 변화시킬 수 있다.`;
            case '여성향수':
                return `
              여성용 향수 특징 및 사용 주의점:
              특징:
              - 여성용 향수는 부드럽고 여성스러운 향이 특징이다.
              - 플로럴, 프루티, 스위트 계열의 향이 일반적이다.
              - 우아함과 섬세함을 강조하며, 가벼운 느낌을 준다.
              - 다양한 계절과 시간대에 어울리는 향들이 많다.
              사용 주의점:
              - 향수는 피부 타입에 따라 향이 달라질 수 있으므로 자신의 피부에 맞는 제품을 선택한다.
              - 향수를 뿌릴 때는 손목, 목 뒤, 귀 뒤쪽 등 피부의 얇은 부위에 뿌려 향이 오래 지속되도록 한다.
              - 향수를 직접 옷에 뿌리면 얼룩이 생길 수 있으니 주의한다.
              - 향수를 사용할 때는 다른 향이 강한 화장품과의 조화를 고려한다.`;
            case '남녀공용':
                return `
              남녀공용 향수 특징 및 사용 주의점:
              특징:
              - 남녀공용 향수는 성별 구분 없이 사용할 수 있는 중성적인 향이 특징이다.
              - 신선하고 자연스러운 향기가 주를 이룬다.
              - 다양한 상황과 환경에서 사용하기 적합하다.
              - 유니크하고 개성 있는 향으로, 개인의 취향을 반영한다.
              사용 주의점:
              - 향수의 향이 개인의 체취와 어우러져 새로운 향을 만들어내므로, 개인의 체취를 고려하여 선택한다.
              - 향수 사용 전에 무향 로션을 바르면 향이 더 오래 지속될 수 있다.
              - 다른 사람들과의 공간에서 사용할 때는 주변 사람들에게 불쾌감을 주지 않도록 적당량을 사용한다.
              - 향수를 보관할 때는 직사광선을 피하고 서늘한 곳에 보관하여 향의 변질을 방지한다.`;
            default:
                return '';
        }
    };

    return (
        <div>
            <img src={imageUrl} alt={productName} />
            <h2>{productName}</h2>
            <p>{productDescription}</p>
            <p>{getPerfumeAdvice(perfumeType)}</p>
        </div>
    );
};

export default ProductDetail;
