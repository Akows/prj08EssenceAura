import { useState } from 'react';

export const useMenuState = () => {
    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
    const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

    const toggleHamburgerMenu = () => {
        setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
        if (isSettingsMenuOpen) {
            setIsSettingsMenuOpen(false);
        }
    };

    const toggleSettingsMenu = () => {
        setIsSettingsMenuOpen(!isSettingsMenuOpen);
        if (isHamburgerMenuOpen) {
            setIsHamburgerMenuOpen(false);
        }
    };

    const closeMenus = () => {
        setIsHamburgerMenuOpen(false);
        setIsSettingsMenuOpen(false);
    };

    return {
        isHamburgerMenuOpen,
        isSettingsMenuOpen,
        toggleHamburgerMenu,
        toggleSettingsMenu,
        closeMenus,
    };
};
