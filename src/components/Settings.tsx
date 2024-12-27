import React, { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerBody, DrawerFooter, Button, Input, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Link } from "@nextui-org/react";
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
  workSound: "focus2mc",
  breakSound: "break1mc"
};

// Static arrays for focus and break sounds
const FOCUS_SOUNDS = [
  'focus1.mp3',
  'focus2mc.mp3',
  'focus3.mp3'
];

const BREAK_SOUNDS = [
  'break1mc.mp3',
  'break2.mp3',
  'break3.mp3'
];

// Add this function at component level
const playSound = (soundName: string) => {
  const audio = new Audio(`/sounds/${soundName}.mp3`);
  audio.play().catch(error => console.error('Error playing sound:', error));
};

export function SettingsDrawer({ isOpen, onClose }: SettingsDrawerProps) {
  const [workTime, setWorkTime] = useState("50");
  const [breakTime, setBreakTime] = useState("10");
  const [longBreakTime, setLongBreakTime] = useState("30");
  const [workSound, setWorkSound] = useState("focus2mc");
  const [breakSound, setBreakSound] = useState("break1mc");
  const [workSoundOptions, setWorkSoundOptions] = useState<SoundOption[]>([]);
  const [breakSoundOptions, setBreakSoundOptions] = useState<SoundOption[]>([]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Load saved settings when drawer opens
  useEffect(() => {
    if (isOpen) {
      const savedSettings = localStorage.getItem('timerSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setWorkTime(settings.workMinutes || "50");
        setBreakTime(settings.breakMinutes || "10");
        setLongBreakTime(settings.longBreakMinutes || "30");
        setWorkSound(settings.workSound || "focus2mc");
        setBreakSound(settings.breakSound || "break1mc");
      }
    }
  }, [isOpen]);

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
      workMinutes: workTime || "50",
      breakMinutes: breakTime || "10",
      longBreakMinutes: longBreakTime || "30",
      workSound: workSound || "focus2mc",
      breakSound: breakSound || "break1mc"
    };
    
    localStorage.setItem('timerSettings', JSON.stringify(settings));
    window.dispatchEvent(new Event('settingsUpdated'));
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
    <>
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
                type="number"
                labelPlacement="outside"
                placeholder={DEFAULT_SETTINGS.workMinutes}
                value={workTime}
                onChange={(e) => setWorkTime(e.target.value)}
                onWheel={(e) => handleWheel(e, setWorkTime, workTime)}
                min={1}
                max={420}
                classNames={{
                  label: "!text-white",
                  input: "!bg-white/10 !text-white",
                  inputWrapper: "!bg-white/10"
                }}
              />
              <Input
                label="Break"
                type="number"
                labelPlacement="outside"
                placeholder={DEFAULT_SETTINGS.breakMinutes}
                value={breakTime}
                onChange={(e) => setBreakTime(e.target.value)}
                onWheel={(e) => handleWheel(e, setBreakTime, breakTime)}
                min={1}
                max={420}
                classNames={{
                  label: "!text-white",
                  input: "!bg-white/10 !text-white",
                  inputWrapper: "!bg-white/10"
                }}
              />
              <Input
                label="Long Break"
                type="number"
                labelPlacement="outside"
                placeholder={DEFAULT_SETTINGS.longBreakMinutes}
                value={longBreakTime}
                onChange={(e) => setLongBreakTime(e.target.value)}
                onWheel={(e) => handleWheel(e, setLongBreakTime, longBreakTime)}
                min={1}
                max={420}
                classNames={{
                  label: "!text-white",
                  input: "!bg-white/10 !text-white",
                  inputWrapper: "!bg-white/10"
                }}
              />
            </div>
            <Select
              label="Work Sound"
              labelPlacement="outside"
              placeholder="Select a sound"
              value={workSound}
              onChange={(e) => {
                setWorkSound(e.target.value);
                playSound(e.target.value);
              }}
              classNames={{
                label: "!text-white",
                trigger: "!bg-white/10",
                value: "!text-white",
                base: "!text-white",
                popoverContent: "!bg-zinc-900",
                listboxWrapper: "!bg-zinc-900",
                selectorIcon: "!text-white"
              }}
            >
              {workSoundOptions.map((sound) => (
                <SelectItem 
                  key={sound.value} 
                  value={sound.value} 
                  className="!text-white hover:!bg-white hover:!text-black data-[selected=true]:!bg-white/20"
                >
                  {sound.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Break Sound"
              labelPlacement="outside"
              placeholder="Select a sound"
              value={breakSound}
              onChange={(e) => {
                setBreakSound(e.target.value);
                playSound(e.target.value);
              }}
              classNames={{
                label: "!text-white",
                trigger: "!bg-white/10",
                value: "!text-white",
                base: "!text-white",
                popoverContent: "!bg-zinc-900",
                listboxWrapper: "!bg-zinc-900",
                selectorIcon: "!text-white"
              }}
            >
              {breakSoundOptions.map((sound) => (
                <SelectItem 
                  key={sound.value} 
                  value={sound.value} 
                  className="!text-white hover:!bg-white hover:!text-black data-[selected=true]:!bg-white/20"
                >
                  {sound.label}
                </SelectItem>
              ))}
            </Select>
          </DrawerBody>
          <DrawerFooter className="flex gap-4 justify-between">
            <Button
              variant="light"
              className="text-white/50 hover:text-white"
              onPress={() => setIsAboutOpen(true)}
            >
              About
            </Button>
            <div className="flex gap-4">
              <Button
                variant="bordered"
                className="text-white border-white/20"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                className="bg-white text-black"
                onPress={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Modal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)}
        size="md"
        backdrop="blur"
        classNames={{
          base: "bg-black/95 shadow-[0_0_35px_-5px_rgba(255,255,255,0.3)] border border-white/[0.05] mb-16",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-white">About</ModalHeader>
              <ModalBody className="text-white/80">
                <p>
                  Thank you for using my app! I hope it helps you stay focused and productive. This app is completely open source, you can contribute{' '}
                  <Link href="https://github.com/JYunth/should-be-studying" isExternal className="text-white">
                    here
                  </Link>.
                </p>
                <p className="mt-2">
                  I am JYunth. I build more stuff like this, if I am bored. You can follow me on{' '}
                  <Link href="https://x.com/jheyanth_CS" isExternal className="text-white">
                    X
                  </Link>.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="light" 
                  onClick={onClose}
                  className="text-white"
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export function SettingsButton({ onPress }: { onPress: () => void }) {
  return (
    <Button
      isIconOnly
      variant="bordered"
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center opacity-80 hover:bg-white group"
      onPress={onPress}
    >
      <Settings2 size={20} className="text-white group-hover:text-black" />
    </Button>
  );
} 