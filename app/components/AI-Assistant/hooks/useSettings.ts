import { useState, useEffect } from "react";
import { ChatSettings } from "../ai-types/types";

/**
 * Custom hook for managing chat settings
 */
export function useSettings() {
	// Default settings
	const DEFAULT_SETTINGS: ChatSettings = {
		notificationSound: "/sounds/notification.mp3",
		soundEnabled: localStorage.getItem("chatSoundEnabled") === "true",
		saveChatHistory: localStorage.getItem("chatSaveChatHistory") === "true",
	};

	const [settings, setSettings] = useState<ChatSettings>(DEFAULT_SETTINGS);

	// Load settings from localStorage on mount
	useEffect(() => {
		if (typeof window !== "undefined") {
			const soundEnabledPref = localStorage.getItem("chatSoundEnabled");
			const saveChatHistoryPref = localStorage.getItem(
				"chatSaveChatHistory"
			);

			const loadedSettings: Partial<ChatSettings> = {};

			if (soundEnabledPref !== null) {
				loadedSettings.soundEnabled = soundEnabledPref === "true";
			}

			if (saveChatHistoryPref !== null) {
				loadedSettings.saveChatHistory = saveChatHistoryPref === "true";
			}

			// Only update state if we have at least one saved setting
			if (Object.keys(loadedSettings).length > 0) {
				setSettings((prev) => ({ ...prev, ...loadedSettings }));
			}
		}
	}, []);

	// Save settings to localStorage when they change
	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem(
				"chatSoundEnabled",
				String(settings.soundEnabled)
			);
			localStorage.setItem(
				"chatSaveChatHistory",
				String(settings.saveChatHistory)
			);
		}
	}, [settings]);

	// Function to update settings
	const updateSettings = (newSettings: Partial<ChatSettings>) => {
		setSettings((prev) => ({ ...prev, ...newSettings }));
	};

	return { settings, updateSettings };
}
