using System.Collections;
using System.Collections.Generic;
using UnityEngine;
#pragma warning disable 649


public class SmoothFollow : MonoBehaviour
{

	// The target we are following
	[SerializeField]
	public Transform target;
	// The distance in the x-z plane to the target
	[SerializeField]
	private float distance = 0.0f;
	// the height we want the camera to be above the target
	[SerializeField]
	private float height = -50.0f;

	[SerializeField]
	private float rotationDamping;
	[SerializeField]
	private float heightDamping;

	// Use this for initialization
	void Start() { }

	// Update is called once per frame
	void LateUpdate()
	{
		// Early out if we don't have a target
		if (!target)
			return;

		// Calculate the current rotation angles
		var wantedRotationAngle = target.eulerAngles.y;
		var wantedHeight = target.position.y + height;
		// var wantedHeight = target.position.y;

		var currentRotationAngle = transform.eulerAngles.y;
		var currentHeight = transform.position.y;

		// Damp the rotation around the y-axis
		currentRotationAngle = Mathf.LerpAngle(currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);

		// Damp the height
		currentHeight = Mathf.Lerp(currentHeight, wantedHeight, heightDamping * Time.deltaTime);

		// Convert the angle into a rotation
		var currentRotation = Quaternion.Euler(0, currentRotationAngle, 0);

		// Set the position of the camera on the x-z plane to:
		// distance meters behind the target
		transform.position = target.position;
		transform.position -= currentRotation * Vector3.forward * distance;

		// Set the height of the camera
		// transform.position = new Vector3(transform.position.x, currentHeight, transform.position.z);
		transform.position = new Vector3(transform.position.x, transform.position.y, transform.position.z);

		// Always look at the target
		// transform.LookAt(target);
	}
}
