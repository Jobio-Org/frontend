"use client";

import { LanguageSwitcher } from "@/widgets/locale";
import { ThemeSwitcher } from "@/widgets/theme";

import { Card } from "@/shared/ui/atoms";

export default function Home() {
    return (
        <Card variant='outlined'>
            <LanguageSwitcher />
            <ThemeSwitcher />
        </Card>
    );
}
