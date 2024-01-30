import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useChangeLanguage } from '../../hooks/useChangeLanguage';
import { useChangeTheme } from '../../hooks/useChangeTheme';
import { RootState } from '../../redux/store';

const DropdownMenu = styled.div`
    background-color: #f9f9f9;
    position: absolute;
    top: 60px; // Navigation bar의 높이에 맞춤
    left: 0;
    right: 0;
    padding: 1rem;
    display: flex;
    justify-content: start;
    align-items: flex-start;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 20;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1rem; // 섹션 간 간격
`;

const SectionTitle = styled.h4`
    margin: 0 0 1rem 0; // 하단 마진 추가
    font-size: 1rem;
    color: #333;
`;

const Button = styled.button`
    background: none;
    border: none;
    color: #333;
    text-align: left;
    padding: 0.25rem 0;
    cursor: pointer;

    &.selected {
        background-color: #e0e0e0; // 선택된 버튼의 배경색
    }

    &:hover {
        text-decoration: underline;
    }
`;

const ButtonColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%; // 너비 조정
`;

const LanguageThemeDropDownMenu: React.FC = () => {
    const changeLanguage = useChangeLanguage();
    const changeTheme = useChangeTheme();

    const currentTheme = useSelector((state: RootState) => state.ui.theme);
    const currentLanguage = useSelector(
        (state: RootState) => state.ui.language
    );

    return (
        <DropdownMenu>
            <Section>
                <SectionTitle>언어 선택</SectionTitle>
                <ButtonColumn>
                    <Button
                        onClick={() => changeLanguage('en')}
                        className={currentLanguage === 'en' ? 'selected' : ''}
                    >
                        English
                    </Button>
                    <Button
                        onClick={() => changeLanguage('ko')}
                        className={currentLanguage === 'ko' ? 'selected' : ''}
                    >
                        한국어
                    </Button>
                </ButtonColumn>
            </Section>
            <Section>
                <SectionTitle>테마 선택</SectionTitle>
                <ButtonColumn>
                    <Button
                        onClick={() => changeTheme('light')}
                        className={currentTheme === 'light' ? 'selected' : ''}
                    >
                        화이트
                    </Button>
                    <Button
                        onClick={() => changeTheme('dark')}
                        className={currentTheme === 'dark' ? 'selected' : ''}
                    >
                        블랙
                    </Button>
                </ButtonColumn>
            </Section>
        </DropdownMenu>
    );
};

export default LanguageThemeDropDownMenu;
