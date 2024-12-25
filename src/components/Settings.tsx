import React from 'react';
import { Drawer, DrawerContent, DrawerBody, DrawerFooter, Button, Tabs, Tab } from "@nextui-org/react";
import { Settings2 } from 'lucide-react';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsDrawer({ isOpen, onClose }: SettingsDrawerProps) {
  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      placement="right"
      backdrop="blur"
    >
      <DrawerContent className="bg-black/95 shadow-[0_0_35px_-5px_rgba(255,255,255,0.3)] border-l border-white/[0.05]">
        <div className="flex justify-center pt-6">
          <Tabs 
            variant="solid"
            radius="full"
            classNames={{
              tabList: "bg-white/[0.1] p-0.5",
              cursor: "bg-white/25",
              tab: "text-white font-normal",
              tabContent: "text-white font-normal"
            }}
            aria-label="Settings tabs"
          >
            <Tab key="settings" title={<span className="text-white">Settings</span>} />
            <Tab key="about" title={<span className="text-white">About</span>} />
          </Tabs>
        </div>
        <DrawerBody className="pt-6">
          <div className="text-white/70">
            Settings content coming soon...
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button
            variant="bordered"
            className="text-white border-white/20"
            onClick={onClose}
          >
            Close
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