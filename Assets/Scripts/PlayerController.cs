using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField]
    private KeyCode jumpKeyCode = KeyCode.Space;
    [SerializeField]
    private CameraController cameraController;
    private Movement3D movement3D;

    private void Awake()
    {
        movement3D = GetComponent<Movement3D>();
    }

    private void Update()
    {
        // x,z 방향이동
        
        float x = Input.GetAxisRaw("Horizontal"); //방향키 좌/우 움직임
        float z = Input.GetAxisRaw("Vertical");  // 방향키 위/아래 움직임

        movement3D.MoveTo(new Vector3(x,0,z));

        // 점프키를 눌러 y축 방향으로 뛰어 오르기 (Jump)
        if ( Input.GetKeyDown(jumpKeyCode) )
        {
            movement3D.JumpTo();
        }

        float mouseX = Input.GetAxis("Mouse X"); //마우스 좌/우 움직임
        float mouseY = Input.GetAxis("Mouse Y"); // 마우스 위/아래 움직임

        cameraController.RotateTo(mouseX, mouseY);

    }
}
