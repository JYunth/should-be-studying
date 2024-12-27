import React, { useState, useEffect, WheelEvent } from 'react';
import { Drawer, DrawerContent, DrawerBody, DrawerFooter, Button, Input, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Link, User } from "@nextui-org/react";
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
  workSound: "minecraft_anvil",
  breakSound: "minecraft_xp"
};

const FOCUS_SOUNDS = [
  'minecraft_anvil',
  'modern_focus',
  'mac_startup'
];

const BREAK_SOUNDS = [
  'minecraft_xp',
  'modern_break',
  'crowd_applause'
];

const playSound = (soundName: string) => {
  const audio = new Audio(`/sounds/${soundName}.mp3`);
  audio.play().catch(error => console.error('Error playing sound:', error));
};

export function SettingsDrawer({ isOpen, onClose }: SettingsDrawerProps) {
  const [workTime, setWorkTime] = useState("50");
  const [breakTime, setBreakTime] = useState("10");
  const [longBreakTime, setLongBreakTime] = useState("30");
  const [workSound, setWorkSound] = useState("minecraft_anvil");
  const [breakSound, setBreakSound] = useState("minecraft_xp");
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
        setWorkSound(settings.workSound || "minecraft_anvil");
        setBreakSound(settings.breakSound || "minecraft_xp");
      }
    }
  }, [isOpen]);

  const handleWheel = (e: WheelEvent<HTMLInputElement>, setValue: (value: string) => void, currentValue: string) => {
    e.preventDefault();
    if (e.deltaY) {
      const delta = e.deltaY < 0 ? 1 : -1;
      const newValue = Math.max(1, Math.min(420, parseInt(currentValue) + delta));
      setValue(newValue.toString());
    }
  };

  useEffect(() => {
    const formatLabel = (filename: string) => {
      return filename
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    const workOptions: SoundOption[] = FOCUS_SOUNDS.map(file => ({
      label: formatLabel(file),
      value: file
    }));

    const breakOptions: SoundOption[] = BREAK_SOUNDS.map(file => ({
      label: formatLabel(file),
      value: file
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
      workSound: workSound || "minecraft_anvil",
      breakSound: breakSound || "minecraft_xp"
    };
    
    localStorage.setItem('timerSettings', JSON.stringify(settings));
    window.dispatchEvent(new Event('settingsUpdated'));
    onClose();
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
              selectedKeys={[workSound]}
              placeholder={workSoundOptions.find(opt => opt.value === workSound)?.label || "Select a sound"}
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
                  className="text-white hover:bg-white hover:text-black data-[selected=true]:bg-white/20 data-[selected=true]:text-white transition-all"
                >
                  {sound.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Break Sound"
              labelPlacement="outside"
              selectedKeys={[breakSound]}
              placeholder={breakSoundOptions.find(opt => opt.value === breakSound)?.label || "Select a sound"}
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
                  className="text-white hover:bg-white hover:text-black data-[selected=true]:bg-white/20 data-[selected=true]:text-white transition-all"
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
                <div className="flex items-center justify-center gap-2 mt-4">
                  Made with <span role="img" aria-label="heart">❤️</span> by{' '}
                  <Link 
                    href="https://linktr.ee/JYunth" 
                    isExternal
                  >
                    <User
                      name="JYunth"
                      avatarProps={{
                        src: "https://utfs.io/f/faV3Ezo4eMA3M43MFlQeuXNDGJldCV5c3THoE1kxOhaWgj42",
                        className: "ring-2 ring-green-500",
                        isBordered: true,
                      }}
                    />
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="light" 
                  onPress={onClose}
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