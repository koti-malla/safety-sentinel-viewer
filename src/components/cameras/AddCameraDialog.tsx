import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddCameraDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Camera</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Camera</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Camera Name</Label>
            <Input id="name" placeholder="Enter camera name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site">Site</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Main Office</SelectItem>
                <SelectItem value="warehouse">Warehouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter location" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">RTSP URL</Label>
            <Input id="url" placeholder="rtsp://" />
          </div>
          <Button type="submit">Add Camera</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCameraDialog;