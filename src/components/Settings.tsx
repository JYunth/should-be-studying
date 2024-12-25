import React, { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerBody, DrawerFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Settings2 } from 'lucide-react';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SoundOption {
  label: string;
  value: string;
}

interface TimerSettings {
  workMinutes: string;
  breakMinutes: string;
  longBreakMinutes: string;
  workSound: string;
  breakSound: string;
}

const DEFAULT_SETTINGS: TimerSettings = {
  workMinutes: "50",
  breakMinutes: "10",
  longBreakMinutes: "30",
  workSound: "focus1",
  breakSound: "break1"
};

// Static arrays for focus and break sounds
const FOCUS_SOUNDS = [
  'focus1.mp3',
  'focus2.mp3',
  'focus3.mp3'
];

const BREAK_SOUNDS = [
  'break1.mp3',
  'break2.mp3',
  'break3.mp3'
];

export function SettingsDrawer({ isOpen, onClose }: SettingsDrawerProps) {
  const [workTime, setWorkTime] = useState(DEFAULT_SETTINGS.workMinutes);
  const [breakTime, setBreakTime] = useState(DEFAULT_SETTINGS.breakMinutes);
  const [longBreakTime, setLongBreakTime] = useState(DEFAULT_SETTINGS.longBreakMinutes);
  const [workSound, setWorkSound] = useState(DEFAULT_SETTINGS.workSound);
  const [breakSound, setBreakSound] = useState(DEFAULT_SETTINGS.breakSound);
  const [workSoundOptions, setWorkSoundOptions] = useState<SoundOption[]>([]);
  const [breakSoundOptions, setBreakSoundOptions] = useState<SoundOption[]>([]);

  // Load settings from localStorage when component mounts
  useEffect(() => {
    const savedSettings = localStorage.getItem('timerSettings');
    if (savedSettings) {
      const settings: TimerSettings = JSON.parse(savedSettings);
      setWorkTime(settings.workMinutes);
      setBreakTime(settings.breakMinutes);
      setLongBreakTime(settings.longBreakMinutes);
      setWorkSound(settings.workSound);
      setBreakSound(settings.breakSound);
    }
  }, []);

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>, setValue: (value: string) => void, currentValue: string) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1 : -1;
    const newValue = Math.max(1, Math.min(420, parseInt(currentValue) + delta));
    setValue(newValue.toString());
  };

  useEffect(() => {
    // Function to format the label from filename
    const formatLabel = (filename: string) => {
      const name = filename.split('.')[0]; // Remove extension
      const number = name.match(/\d+/)?.[0] || '';
      const type = name.replace(/\d+/g, '');
      return `${type.charAt(0).toUpperCase() + type.slice(1)} Sound ${number}`;
    };

    const workOptions: SoundOption[] = FOCUS_SOUNDS.map(file => ({
      label: formatLabel(file),
      value: file.split('.')[0]
    }));

    const breakOptions: SoundOption[] = BREAK_SOUNDS.map(file => ({
      label: formatLabel(file),
      value: file.split('.')[0]
    }));

    setWorkSoundOptions(workOptions);
    setBreakSoundOptions(breakOptions);

    // Set default values if none selected
    if (!workSound && workOptions.length > 0) {
      setWorkSound(workOptions[0].value);
    }
    if (!breakSound && breakOptions.length > 0) {
      setBreakSound(breakOptions[0].value);
    }
  }, []);

  const handleSave = () => {
    const settings: TimerSettings = {
      workMinutes: workTime,
      breakMinutes: breakTime,
      longBreakMinutes: longBreakTime,
      workSound: workSound,
      breakSound: breakSound
    };
    
    localStorage.setItem('timerSettings', JSON.stringify(settings));
    onClose();
  };

  const handleNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: (value: string) => void
  ) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove any non-digits
    const numValue = parseInt(value) || 0;
    if (numValue <= 420) {
      setValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, decimal point, numbers
    // The lengths I gotta go to provide a seamless experience
    if (
      !/[0-9]/.test(e.key) && // numbers
      e.key !== 'Backspace' &&
      e.key !== 'Delete' &&
      e.key !== 'Tab' &&
      e.key !== 'Escape' &&
      e.key !== 'Enter' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight' &&
      e.key !== 'ArrowUp' &&
      e.key !== 'ArrowDown'
    ) {
      e.preventDefault();
    }
  };

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      placement="right"
      backdrop="blur"
    >
      <DrawerContent className="bg-black/95 shadow-[0_0_35px_-5px_rgba(255,255,255,0.3)] border-l border-white/[0.05]">
        <div className="flex flex-col items-center pt-6">
          <h2 className="text-xl font-light text-white">Settings</h2>
          <div className="w-12 h-px bg-white/20 mt-4"></div>
        </div>
        <DrawerBody className="pt-6 flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Work"
              labelPlacement="outside"
              placeholder={DEFAULT_SETTINGS.workMinutes}
              value={workTime}
              onChange={(e) => handleNumberInput(e, setWorkTime)}
              onKeyDown={handleKeyDown}
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              min="1"
              max="420"
              step="1"
              onWheel={(e) => handleWheel(e, setWorkTime, workTime)}
              classNames={{
                label: "!text-white",
                input: "!bg-white/10 !text-white placeholder:!text-white",
                inputWrapper: "!bg-white/10"
              }}
            />
            <Input
              label="Break"
              labelPlacement="outside"
              placeholder={DEFAULT_SETTINGS.breakMinutes}
              value={breakTime}
              onChange={(e) => handleNumberInput(e, setBreakTime)}
              onKeyDown={handleKeyDown}
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              min="1"
              max="420"
              step="1"
              onWheel={(e) => handleWheel(e, setBreakTime, breakTime)}
              classNames={{
                label: "!text-white",
                input: "!bg-white/10 !text-white placeholder:!text-white",
                inputWrapper: "!bg-white/10"
              }}
            />
            <Input
              label="Long Break"
              labelPlacement="outside"
              placeholder={DEFAULT_SETTINGS.longBreakMinutes}
              value={longBreakTime}
              onChange={(e) => handleNumberInput(e, setLongBreakTime)}
              onKeyDown={handleKeyDown}
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              min="1"
              max="420"
              step="1"
              onWheel={(e) => handleWheel(e, setLongBreakTime, longBreakTime)}
              classNames={{
                label: "!text-white",
                input: "!bg-white/10 !text-white placeholder:!text-white",
                inputWrapper: "!bg-white/10"
              }}
            />
          </div>
          <Select
            label="Work Sound"
            labelPlacement="outside"
            placeholder="Select a sound"
            value={workSound}
            onChange={(e) => setWorkSound(e.target.value)}
            classNames={{
              label: "!text-white",
              trigger: "!bg-white/10",
              value: "!text-white",
              base: "!text-white",
              popoverContent: "!bg-zinc-900",
              listboxWrapper: "!bg-zinc-900"
            }}
          >
            {workSoundOptions.map((sound) => (
              <SelectItem key={sound.value} value={sound.value} className="!text-white">
                {sound.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Break Sound"
            labelPlacement="outside"
            placeholder="Select a sound"
            value={breakSound}
            onChange={(e) => setBreakSound(e.target.value)}
            classNames={{
              label: "!text-white",
              trigger: "!bg-white/10",
              value: "!text-white",
              base: "!text-white",
              popoverContent: "!bg-zinc-900",
              listboxWrapper: "!bg-zinc-900"
            }}
          >
            {breakSoundOptions.map((sound) => (
              <SelectItem key={sound.value} value={sound.value} className="!text-white">
                {sound.label}
              </SelectItem>
            ))}
          </Select>
        </DrawerBody>
        <DrawerFooter className="flex gap-4">
          <Button
            variant="bordered"
            className="text-white border-white/20"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-white text-black"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function SettingsButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      isIconOnly
      variant="bordered"
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center opacity-80 hover:bg-white group"
      onClick={onClick}
    >
      <Settings2 size={20} className="text-white group-hover:text-black" />
    </Button>
  );
} 