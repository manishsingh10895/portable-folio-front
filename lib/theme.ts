import { extendTheme, theme } from '@chakra-ui/react';
import { lighten, darken, } from '@chakra-ui/theme-tools';
import { ISite } from '../models/site.model';
import sanityService from './services/sanity.service';
import siteData from "../data/site-details.json";

export function buildTheme() {
    const siteDetails: ISite = siteData as any;

    const { primaryColor, secondaryColor, primaryBgColor, secondaryBgColor } = siteDetails as ISite;

    const colors = {
        primary: {
            main: primaryColor,
            50: lighten(primaryColor, 0.5)(theme),
            100: lighten(primaryColor, 0.1)(theme),
            200: lighten(primaryColor, 0.2)(theme),
            300: lighten(primaryColor, 0.3)(theme),
            400: lighten(primaryColor, 0.4)(theme),
            500: darken(primaryColor, 0.5)(theme),
            600: darken(primaryColor, 0.6)(theme),
            700: darken(primaryColor, 0.7)(theme),
            800: darken(primaryColor, 0.8)(theme),
            900: darken(primaryColor, 0.9)(theme),
        },
        secondary: {
            main: secondaryColor,
            50: lighten(secondaryColor, 0.5)(theme),
            100: lighten(secondaryColor, 0.1)(theme),
            200: lighten(secondaryColor, 0.2)(theme),
            300: lighten(secondaryColor, 0.3)(theme),
            400: lighten(secondaryColor, 0.4)(theme),
            500: darken(secondaryColor, 0.5)(theme),
            600: darken(secondaryColor, 0.6)(theme),
            700: darken(secondaryColor, 0.7)(theme),
            800: darken(secondaryColor, 0.8)(theme),
            900: darken(secondaryColor, 0.9)(theme),
        },
        pmBG: {
            main: primaryBgColor,
            50: lighten(primaryBgColor, 0.5)(theme),
            100: lighten(primaryBgColor, 0.1)(theme),
            200: lighten(primaryBgColor, 0.2)(theme),
            300: lighten(primaryBgColor, 0.3)(theme),
            400: lighten(primaryBgColor, 0.4)(theme),
            500: darken(primaryBgColor, 0.5)(theme),
            600: darken(primaryBgColor, 0.6)(theme),
            700: darken(primaryBgColor, 0.7)(theme),
            800: darken(primaryBgColor, 0.8)(theme),
            900: darken(primaryBgColor, 0.9)(theme),
        },
        scBG: {
            main: secondaryBgColor,
            50: lighten(secondaryBgColor, 0.5)(theme),
            100: lighten(secondaryBgColor, 0.1)(theme),
            200: lighten(secondaryBgColor, 0.2)(theme),
            300: lighten(secondaryBgColor, 0.3)(theme),
            400: lighten(secondaryBgColor, 0.4)(theme),
            500: darken(secondaryBgColor, 0.5)(theme),
            600: darken(secondaryBgColor, 0.6)(theme),
            700: darken(secondaryBgColor, 0.7)(theme),
            800: darken(secondaryBgColor, 0.8)(theme),
            900: darken(secondaryBgColor, 0.9)(theme),
        }
    }

    return extendTheme({
        colors,
        shadows: {
            outline: '0 0 0 0px var(--chakra-colors-green-500)'
        },
    });
}