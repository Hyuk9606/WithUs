using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using Cinemachine;
using UnityEngine.SceneManagement;

public class TpsPlayerMove : MonoBehaviour
{
	[SerializeField]
	private float maximumSpeed = 7.0f;

	[SerializeField]
	private float rotationSpeed = 4.0f;

	[SerializeField]
	private float jumpSpeed = 5.0f;

	[SerializeField]
	private float jumpButtonGracePeriod;

	[SerializeField]
	private Transform cameraTransform;

	private Animator animator;
	private CharacterController characterController;
	private float ySpeed;
	private float originalStepOffset;
	private float? lastGroundedTime;
	private float? jumpButtonPressedTime;
	private PhotonView pv;
	private CinemachineFreeLook virtualCamera;


	// Start is called before the first frame update
	void Start()
	{
		animator = GetComponent<Animator>();
		characterController = GetComponent<CharacterController>();
		originalStepOffset = characterController.stepOffset;
		pv = GetComponent<PhotonView>();

		this.gameObject.GetComponent<TpsPlayerMove>().cameraTransform = Camera.main.transform;

		virtualCamera = GameObject.FindObjectOfType<CinemachineFreeLook>();

		if (SceneManager.GetActiveScene().name != "DemoScene" && pv.IsMine)
		{
			virtualCamera.Follow = transform.Find("CamPosition").transform;
			virtualCamera.LookAt = transform.Find("CamPosition").transform;
		}
	}
	// cmObject.GetComponent<ChinemachineFreeLook>().objectTofollow = transform.Find("CamPosition").transform;
	// transform.Find("CamPosition").transform;
	// Camera.main.GetComponent<SmoothFollow>().target = transform.Find("CamPosition").transform;
	// tag: CamPosTag
	// Camera.main.GetComponent<SmoothFollow>().target = GameObject.FindGameObjectWithTag("CamPosTag").transform;

	// Update is called once per frame
	void Update()
	{
		if (SceneManager.GetActiveScene().name != "DemoScene" && pv.IsMine)
		{

			float horizontalInput = Input.GetAxis("Horizontal");
			float verticalInput = Input.GetAxis("Vertical");

			Vector3 movementDirection = new Vector3(horizontalInput, 0, verticalInput);
			float inputMagnitude = Mathf.Clamp01(movementDirection.magnitude);

			if (Input.GetKey(KeyCode.LeftShift) || Input.GetKey(KeyCode.RightShift))
			{
				inputMagnitude /= 2;
			}

			animator.SetFloat("Input Magnitude", inputMagnitude, 0.05f, Time.deltaTime);

			float speed = inputMagnitude * maximumSpeed;
			movementDirection = Quaternion.AngleAxis(cameraTransform.rotation.eulerAngles.y, Vector3.up) * movementDirection;
			movementDirection.Normalize();

			ySpeed += Physics.gravity.y * Time.deltaTime;

			if (characterController.isGrounded)
			{
				lastGroundedTime = Time.time;
			}

			if (Input.GetButtonDown("Jump"))
			{
				jumpButtonPressedTime = Time.time;
			}

			if (Time.time - lastGroundedTime <= jumpButtonGracePeriod)
			{
				characterController.stepOffset = originalStepOffset;
				ySpeed = -0.5f;

				if (Time.time - jumpButtonPressedTime <= jumpButtonGracePeriod)
				{
					ySpeed = jumpSpeed;
					jumpButtonPressedTime = null;
					lastGroundedTime = null;
				}
			}
			else
			{
				characterController.stepOffset = 0;
			}

			Vector3 velocity = movementDirection * speed;
			velocity.y = ySpeed;

			characterController.Move(velocity * Time.deltaTime);

			if (movementDirection != Vector3.zero)
			{
				Quaternion toRotation = Quaternion.LookRotation(movementDirection, Vector3.up);

				transform.rotation = Quaternion.RotateTowards(transform.rotation, toRotation, rotationSpeed * Time.deltaTime);
			}
		}
	}

	private void OnApplicationFocus(bool focus)
	{
		if (focus)
		{
			Cursor.lockState = CursorLockMode.Locked;
		}
		else
		{
			Cursor.lockState = CursorLockMode.None;
		}
	}
}

