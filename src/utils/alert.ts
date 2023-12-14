import { AlertController } from "@ionic/angular"

export const createAlert = async (controller: AlertController, header: string, message: string) => {
    const alert = await controller.create({
      header,
      message,
      buttons: ['Ok'],
    })

    return alert
  }