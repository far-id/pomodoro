import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import { useSettingDrawerToggleStore } from '@/features/pomodoro/stores/useSettingDrawerToggleStore';
import { SettingsForm } from './SettingsForm';
import { Field } from '@/components/ui/field';

export const Settings = () => {
	const { isOpen, setIsOpen } = useSettingDrawerToggleStore();

	return (
		<Drawer direction={'right'} open={isOpen} onOpenChange={setIsOpen}>
			<DrawerContent className='data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]'>
				<DrawerHeader>
					<div className='flex justify-between'>
						<DrawerTitle className='text-2xl py-2'>Settings</DrawerTitle>
						<DrawerClose>
							<X />
						</DrawerClose>
					</div>
					<Separator />
				</DrawerHeader>
				<div className='no-scrollbar overflow-y-auto px-4'>
					<SettingsForm id='settings-form' />
				</div>
				<DrawerFooter className='border-t'>
					<Field orientation='horizontal'>
						<Button type='submit' className='w-full' form='settings-form'>
							Apply
						</Button>
					</Field>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
