import Swal from 'sweetalert2'

export class AlertClass {

  static async deleteAlert(callback: (e: any) => void): Promise<any> {
    Swal.fire({
      title: 'Do you want to remove it?',
      text: "You can't undo it",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673BB7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(e => promisFunc(e.isConfirmed).then(e => callback(e)))
  }

}

function promisFunc(trueFalse: boolean): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (trueFalse) return resolve(trueFalse)
    else return reject(trueFalse)
  })
}

export interface ArgumentType {
  title?: string
  text?: string
  type?: 'question' | 'warning'
}
